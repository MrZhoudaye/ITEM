// 借助call实现
function Parent1(){
  this.name = 'father'
}

function Child1(){
  Parent1.call(this);
  this.age = '20'
}

var p = new Child1()
// console.log(p.name)

// 借助原型链,但是会将new出来的实例指向同一个原型对象
function Parent2(){
  this.name = 'father';
  this.list = [1,2,3]
}
function Child2(){
  this.age = '20'
}
Child2.prototype = new Parent2()
var s1 = new Child2()
var s2 = new Child2()
s1.list.push(4)
console.log(s1.list,s2.list) //[1,2,3,4],[1,2,3,4]

// 组合继承
function Parent3(){
  this.name = 'father';
  this.list = [1,2,3]
}
function Child3(){
  // 指向要继承的父构造函数
  Parent3.call(this)
  this.age = '20'
}
Child3.prototype = Object.create(Parent3.prototype)
Child3.prototype.constructor = Child3

var s3 = new Child3()
var s4 = new Child3()
s3.list.push(4)
s4.list.push(5)
// console.log(s3,s4)