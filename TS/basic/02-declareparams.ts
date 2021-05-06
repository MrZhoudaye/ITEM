// var 声明变量的缺点=====函数作用域的存在。。。。

// let 声明变量 ==== 生成块级作用域
// function f1(x):void{
//     let x:number = 10;//同一个块中声明了两个x
// }

function z(condition:boolean,x:number):number{

    // if语句中的x 和函数中的x是不同的块
    if(condition){
        let x:number = 10
        return x
    }
    return x
}

// 块级作用域变量的获取
function cityAlwaysSleep(){
    let getCity
    if(true){
        let city = 'ShangHai'
        getCity = function(){
            return city
        }
    }
    return getCity()
}
let city:string = cityAlwaysSleep()
console.log(city)//正确获取到'ShangHai'

// 解构
let [first,second] = [1,2]
console.log(first)
let o = {
    aa: "foo",
    bb: 12,
    cc: "bar"
};
let { aa, bb } = o;
console.log(aa)
