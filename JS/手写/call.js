Function.prototype.myCall = function (context) {
  var context = context || window
  context.fn = this
  let args = []
  // 存参数
  for(let i=1,len = arguments.length;i<len;i++){
    args.push(arguments[i])
  }
  var result = context.fn(...args)
  delete context.fn
  return result
}

var value = 2
var obj = {
  value:12
}

function fn(id,name){
  console.log(this.value)
  return {
    id,
    name,
    value:this.value
  }
}

fn()
fn.call(obj)
fn.myCall(obj,2,'zz')
console.log(fn.myCall(obj,2,'lz'))