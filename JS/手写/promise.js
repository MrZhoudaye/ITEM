// promise 有三个状态：pending，fulfilled，or rejected；「规范 Promise/A+ 2.1」
// new promise时， 需要传递一个executor()执行器，执行器立即执行；
// executor接受两个参数，分别是resolve和reject；
// promise 的默认状态是 pending；
// promise 有一个value保存成功状态的值，可以是undefined/thenable/promise；「规范 Promise/A+ 1.3」
// promise 有一个reason保存失败状态的值；「规范 Promise/A+ 1.5」
// promise 只能从pending到rejected, 或者从pending到fulfilled，状态一旦确认，就不会再改变；
// promise 必须有一个then方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 和 promise 失败的回调 onRejected；「规范 Promise/A+ 2.2」
// 如果调用 then 时，promise 已经成功，则执行onFulfilled，参数是promise的value；
// 如果调用 then 时，promise 已经失败，那么执行onRejected, 参数是promise的reason；
// 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调onRejected；

// 定义状态
const PENDING = 'PENDING'
const FUIFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

// class Promise {
//   constructor(excutor){
//     // 默认状态
//     this.status = PENDING
//     // 成功参数
//     this.value = undefined
//     // 失败参数
//     this.reason = undefined
//     // 处理异步任务
//     // 存放成功的回调
//     this.onResolvedCallback = []
//     // 存放失败的回调
//     this.onRejectedCallback = []

//     let resolve = (value) => {
//       if(this.status === PENDING){
//         this.status = FUIFILLED
//         this.value = value

//         // 依次执行成功回调
//         this.onResolvedCallback.forEach(fn => fn());
//       }
//     }

//     let reject = (reason) => {
//       if(this.status === PENDING){
//         this.status = REJECTED
//         this.reason = reason

//         // 依次执行失败回调
//         this.onRejectedCallback.forEach(fn => fn())
//       }
//     }

//     try{
//       excutor(resolve, reject)
//     } catch (error){
//       // 异常
//       reject(error)
//     }
//   }

//   // then
//   then(onFulfilled, onRejected){
//     if(this.status === FUIFILLED){
//       onFulfilled(this.value)
//     }
//     if(this.status === REJECTED){
//       onRejected(this.reason)
//     }

//     // pending状态存放回调
//     if(this.status === PENDING){
//       this.onResolvedCallback.push(() => {
//         onFulfilled(this.value)
//       })
//       this.onRejectedCallback.push(() => {
//         onRejected(this.reason)
//       })
//     }
//   }
// }

// 实现链式调用和值的穿透
const resolvePromise = (promise2, x, resolve, reject) => {
  // 自己等待自己，抛出错误
  if (promise2 === x) return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))

  let called
  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      if (typeof then === 'function') {
        let then = x.then
        then.call(x, y => {
          if (called) return
          called = true
          // 递归
          resolvePromise(promise2, y, resolve, reject)
        }, error => {
          if (called) return
          called = true
          reject(error)
        })
      } else {
        // 如果x.then是一个普通值，直接返回结果
        resolve(x)
      }
    } catch(e){
      if(called)return
      called = true
      // 异常直接失败
      reject(e)
    }
  }else{
    // 如果x是个普通值就直接返回
    resolve(x)
  }
}

  class Promise{
    constructor(excutor){
      this.status = PENDING
      this.value = undefined
      this.reason = undefined
      this.onResolvedCallback = []
      this.onRejectedCallback = []

      let resolve = (value) => {
        if(this.status === PENDING){
          this.status = FUIFILLED
          this.value = value
          this.onResolvedCallback.forEach(fn => fn())
        }
      }


      let reject = (reason) => {
        if(this.status === PENDING){
          this.status = REJECTED
          this.reason = reason
          this.onRejectedCallback.forEach(fn => fn())
        }
      }

      try{
        excutor(resolve, reject)
      }catch(error){
        reject(error)
      }
    }

    then(onFulfilled, onRejected){
      // 解决没有传值的问题
      onFulfilled = typeof onFulfilled === 'function'?onFulfilled : v => v
      onRejected = typeof onRejected === 'function'?onRejected : (error) => {throw error}

      let promise2 = new Promise((resolve, reject) => {
        if(this.status === FUIFILLED){
          setTimeout(() => {
            try{
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            }catch(e){
              reject(e)
            }
          }, 0);
        }

        if(this.status === REJECTED){
          setTimeout(() => {
            try{
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            }catch(e){
              reject(e)
            }
          }, 0);
        }

        if(this.status === PENDING){
          this.onResolvedCallback.push(() => {
            setTimeout(() => {
              try{
                let x= onFulfilled(this.value)
                resolvePromise(promise2, x, resolve, reject)
              }catch(e){
                reject(e)
              }
            }, 0);
          })

          this.onRejectedCallback.push(() => {
            setTimeout(() => {
              try{
                let x = onRejected(this.reason)
                resolvePromise(promise2, x, resolve, reject)
              }catch(e){
                reject(e)
              }
            }, 0);
          })
        }
      })

      return promise2
    }
  }

  // 测试
  const promise = new Promise((resolve, reject) => {
    resolve('成功')
    // setTimeout(() => {
    //   resolve('成功')
    // }, 2000);
  }).then().then().then(
    (data) => {
      console.log('success', data)
    },
    (err) => {
      console.log('faild', err)
    }
  )