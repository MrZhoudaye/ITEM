"use strict";
// var 声明变量的缺点=====函数作用域的存在。。。。
// let 声明变量 ==== 生成块级作用域
// function f1(x):void{
//     let x:number = 10;//同一个块中声明了两个x
// }
function z(condition, x) {
    // if语句中的x 和函数中的x是不同的块
    if (condition) {
        var x_1 = 10;
        return x_1;
    }
    return x;
}
// 块级作用域变量的获取
function cityAlwaysSleep() {
    var getCity;
    if (true) {
        var city_1 = 'ShangHai';
        getCity = function () {
            return city_1;
        };
    }
    return getCity();
}
var city = cityAlwaysSleep();
console.log(city); //正确获取到'ShangHai'
// 解构
var _a = [1, 2], first = _a[0], second = _a[1];
console.log(first);
var o = {
    aa: "foo",
    bb: 12,
    cc: "bar"
};
var aa = o.aa, bb = o.bb;
console.log(aa);
