// 
function Promise(excutor){
    let self = this
    self.data = undefined
    self.status = 'PENDING'
    // 成功回调
    self.onResolvedCallback = []
    // 失败回调
    self.onRejectedCallback = []

    // 成功回调
    function resolve(value){
        if(value instanceof Promise){
            return value.then(resolve,reject)
        }
        setTimeout(() => {
            if(self.status === 'PENDING'){
                self.status = 'RESOLVED'
                self.data = value
                // 依次执行回调
                self.onResolvedCallback.forEach(fn => fn())
            }
        })
    }
    // 失败回调
    function reject(reseon){
        setTimeout(() => {
            if(self.status === 'REJECTED'){
                self.status = 'REJECTED'
                self.data = reseon
                // 依次执行回调
                self.onRejectedCallback.forEach(fn => fn())
            }
        })
    }

    // 立即执行
    try{
        excutor(resolve,reject)
    }catch(e){
        reject(e)
    }
}

// 实现链式调用和值得穿透
function resolvePromise(promise2,x,resolve,reject){
    // 自己等待自己
    if(promise2 === x) return reject(new TypeError('Chining cycle deteted for promise'))

    if(x instanceof Promise){
        if(x.status === 'PENDING'){
            x.then(y => {
                resolvePromise(promise2,y,resolve,reject)
            },reject)
        }else{
            x.then(resolve,reject)
        }
    }

    if((x !== null) && ((typeof x === 'object') ||(typeof x === 'function'))){
        let called = false
        try{
            then = x.then
            if(typeof then === 'function'){
                then.call(x,y => {
                    if(called) return 
                    called = true
                    return resolvePromise(promise2,y,resolve,reject)
                },error => {
                    if(called) return
                    called = true
                    return reject(error)
                })
            }else{
                resolve(x)
            }
        }catch(e){
            if(called) return 
            called = true
            return reject(e)
        }
    }else{
        resolve(x)
    }
}

// then方法
Promise.prototype.then = function(onResolved,onRejected){
    var self = this
    var promise2
    onResolved = typeof onResolved === 'function' ? onResolved : function(v){return v}
    onRejected = typeof onRejected === 'function' ? onRejected : function(e){throw e}

    if(self.status === 'RESOLVED'){
        return promise2 = new promise((resolve,reject) => {
            setTimeout(() => {
                try{
                    var x = onResolved(self.data)
                    if(x instanceof Promise){
                        x.then(resolve,reject)
                    }
                    resolve(x)
                }catch(e){
                    reject(e)
                }
            })
        })
    }
    if(self.status === 'REJECTED'){
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                try{
                    var x = onRejected(self.data)
                    if(x instanceof Promise){
                        x.then(resolve,reject)
                    }
                    resolve(x)
                }catch(e){
                    reject(e)
                }
            })
        })
    }
    if(self.status === 'PENDING'){
        // 无法确定调用哪一个
        return new Promise((resolve,reject) => {
            self.onResolvedCallback.push(value => {
                try{
                    var x = onResolved(self.data)
                    if(x instanceof Promise){
                        x.then(resolve,reject)
                    }
                    resolve(x)
                }catch(e){
                    reject(e)
                }
            })
            self.onRejectedCallback.push(value => {
                try{
                    var x = onRejected(self.data)
                    if(x instanceof Promise){
                        x.then(resolve,reject)
                    }
                    resolve(x)
                }catch(e){
                    reject(e)
                }
            })
        })
    }
}

Promise.prototype.catch = function(onRejected){
    return this.then(null,onRejected)
}

Promise.prototype.deferred = Promise.defer = function(){
    var dfd = {}
    dfd.promise = new Promise((resolve,reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}


async function async1(){
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}

async function async2(){
    console.log('async2')
}

async1()

setTimeout(() => {
    console.log('timeout')
},0)

new Promise(resolve => {
    console.log('promise1')
    resolve()
}).then(() => {
    console.log('promise2')
})
console.log('end')