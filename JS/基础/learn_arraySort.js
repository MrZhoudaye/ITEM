var array = [1,3,6,2,1,50,26,32,0,25,16,75]
// 冒泡

// ...

// 快速排序：找基准，比基准小的放前面，比基准大的放后面...递归
function quickSort(array){
    var quick = function(arr){
        if(arr.length <=1) return arr
        const len = arr.length
        const index = Math.floor(len >> 1)
        // 基准
        const pivot = arr.splice(index,1)[0]

        const left = []
        const right = []

        for(let i=0;i<len;i++){
            if(arr[i] > pivot){
                right.push(arr[i])
            }else if(arr[i] <= pivot){
                left.push(arr[i])
            }
        }
        return quick(left).concat([pivot],quick(right))
    }
    const result = quick(array)
    return result
}
// console.log(quickSort(array))

// 插入排序:扫描数组，将小的插在前面
function insertSort(array){
    const len = array.length
    // 当前遍历值
    let current
    // 前一个值
    let prev

    // 遍历数组
    for(let i=1;i<len;i++){
        // 当前值
        current = array[i]
        // 前一个值
        prev = i - 1

        // 如果当前值小于前一个值，那么他肯定要插到前一个值前面，递归，一直找到最小的位置插入
        while(prev >= 0 && array[prev] > current){
            array[prev + 1] = array[prev]
            // 继续往前找
            prev--
        }
        // 执行插入操作，此时current就是目前最小的值，prev+1 就是最小位置的索引（上一步执行了--操作，故+1）
        array[prev + 1] = current
    }
    return array
}
// console.log(insertSort(array))

// 选择排序:选最小的交换位置
function selectSort(array){
    const len = array.length
    let temp
    let minIndex

    for(let i=0;i<len;i++){
        // 先默认第一个是最小的
        minIndex = i
        // 往后找最小的
        for(let j = i+1;j<len;j++){
            if(array[j] <= array[minIndex]){
                minIndex = j
            }
        }
        // 交换位置
        temp = array[i]
        array[i] = array[minIndex]
        array[minIndex] = temp
    }

    return array
}

// console.log(selectSort(array))