// 对象转原始类型的流程
// 先调用Symbol.toPrimitive优先调用再返回
// 调用valueOf，如果为原始类型返回
// 调用toString，如果为原始类型返回
// 如果都没有返回原始类型，报错

// 让if(a == 1 && a == 2)成立

var a = {
  value : 0,
  valueOf: function() {
    console.log(this)
    this.value++;
    return this.value;
  }
}

// var a = {
//   value : 0,
//   valueOf: () => {
//     console.log(this)//这里的this是空对象
//     this.value++;
//     return this.value;
//   }
// }
console.log(a==1&&a==2)