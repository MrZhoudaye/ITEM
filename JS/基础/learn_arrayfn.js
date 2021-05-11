var array = [1, 3, 5, 2, 9]
// push
Array.prototype.mypush = function (...items) {
    // 先转换为对象
    let O = Object(this)
    let len = this.length >>> 0
    let argCount = items.length >>> 0

    if (len + argCount > 2 ** 53 - 1) {
        throw new TypeError("the number of array is over max value")
    }

    for (let i = 0; i < argCount; i++) {
        // 往后添加项
        O[len + i] = items[i]
    }
    // 重新赋值新数组长度
    let newLength = len + argCount
    O.length = newLength
    // push返回新数组长度
    return newLength

}
// array.mypush(10)
// console.log(array,array.mypush(10))

// pop
Array.prototype.mypop = function () {
    let O = Object(this)
    let len = this.length >>> 0
    if (len <= 0) {
        O.length = 0
        return undefined
    }
    // 数组长度
    len--
    let value = O[len]
    // 删掉最后一项
    delete O[len]
    O.length = len

    // 返回被删除的项
    return value
}
// console.log(array,array.mypop())

// map
Array.prototype.mymap = function (callback, thisArg) {
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'map' of null")
    }
    console.log(Object.prototype.toString.call(callback), "map")

    if (Object.prototype.toString.call(callback) != "[object Function]") {
        throw new TypeError(callback + "is not a function")
    }

    let O = Object(this)
    let len = O.length >>> 0
    let newArray = new Array(len)

    for (let k = 0; k < len; k++) {
        if (k in O) {
            let kValue = O[k]

            // 执行回调
            let mappedValue = callback.call(thisArg, kValue, k, O)
            // 推入新数组
            newArray[k] = mappedValue
        }
    }
    // 返回新数组
    return newArray
}
// console.log(array, array.mymap((item) => item + 1),"map")

// reduce
Array.prototype.myreduce = function (callback, initialValue) {
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'map' of null")
    }
    if (Object.prototype.toString.call(callback) != "[object Function]") {
        throw new TypeError(callback + "is not a function")
    }

    let O = Object(this)
    let len = O.length >>> 0
    let k = 0
    let accumulator = initialValue

    // 如果没有初始值
    if (accumulator === undefined) {
        for (; k < len; k++) {
            if (k in O) {
                accumulator = O[k]
                k++
                break
            }
            // 没有元素
            if (k == len && O[k] === undefined) {
                throw new Error("Each element of the array is empty")
            }
        }
    }

    for (; k < len; k++) {
        if (k in O) {
            accumulator = callback.call(undefined, accumulator, O[k], O)
        }
    }

    return accumulator
}

console.log(array, array.myreduce((prev, cur) => prev + cur), "reduce")