"use strict";
// 布尔
var flag = true;
// 数字
var a = 123;
// a="string"   =>报错
// 字符
var strr = "hello world";
// 数组
var arr = [1, 2, 3, 4];
var arr2 = ["js", "java"];
// 元组==固定长度的数组
var arr3 = ["ts", 123, true];
// 枚举
var Flag;
(function (Flag) {
    Flag[Flag["success"] = 1] = "success";
    Flag[Flag["error"] = -1] = "error";
})(Flag || (Flag = {}));
var f = Flag.success;
console.log(f);
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["blue"] = 1] = "blue";
    Color[Color["yellow"] = 2] = "yellow";
})(Color || (Color = {}));
var c = Color.red;
console.log(c); //0
// 任意any
var num = 0;
// null  undefined
// never类型的子类型
var un;
// 如果一个变量开始定义是不能明确类型，可以这样
var unknow;
// void 没有任何类型，常用于函数没有任何返回值
function run() {
    console.log("void");
}
run();
// never  包括null undefiend 代表从不会出现的值
// object  非原始类型  除 number string boolean null undefind symbol之外的类型
var obj;
// obj = {name:'zhang',age:19} =========结构中没有age属性，会报错
var obj2; // ? 代表可选属性，可有可无
obj2 = { name: 'li', age: 18 };
var obj3; //[propName:string]:any 表示任意属性
obj3 = { name: 'wang', age: 18, x: 'man' };
// 函数
var fn; //  函数结构，两个数字类型参数，返回数字
fn = function (m, n) {
    return m + n;
};
// 类型断言
// 尖括号语法
var someValue = 'this is a string';
var someLength = someValue.length;
console.log(someLength);
