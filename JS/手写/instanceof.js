// 手动实现instanceof
function myInstanceof(aims,type){
  // 如果是基本数据类型
  if(typeof aims !== 'object' || typeof aims === null) return false

  // 如果是复杂数据类型
  let proto = Object.getPrototypeOf(aims)
  console.log(proto,"-- INSERT --")
  if(proto == null) return false

  if(proto == type.prototype) return true
  myInstanceof(proto)
}

console.log(myInstanceof('111',String))
console.log(myInstanceof(new String("111"),String))

// console.log(![],!{})