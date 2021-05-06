// 布尔
var flag:boolean = true


// 数字
var a:number = 123

// a="string"   =>报错


// 字符
var strr:string = "hello world"

// 数组
let arr:number[] = [1,2,3,4]

let arr2:Array<string>=["js","java"]

// 元组==固定长度的数组
let arr3:[string,number,boolean] = ["ts",123,true]

// 枚举
enum Flag {success=1,error=-1}
let f:Flag = Flag.success
console.log(f)

enum Color {red,blue,yellow}
let c:Color= Color.red
console.log(c) //0

// 任意any
let num:any = 0

// null  undefined
// never类型的子类型
let un:undefined;

// 如果一个变量开始定义是不能明确类型，可以这样
let unknow:undefined | null

// void 没有任何类型，常用于函数没有任何返回值
function run():void{
    console.log("void")
}
run()

// never  包括null undefiend 代表从不会出现的值

// object  非原始类型  除 number string boolean null undefind symbol之外的类型
let obj:{name :string}
// obj = {name:'zhang',age:19} =========结构中没有age属性，会报错
let obj2:{name:string,age?:18} // ? 代表可选属性，可有可无
obj2 = {name:'li',age:18}

let obj3:{name:string,[propName:string]:any}  //[propName:string]:any 表示任意属性
obj3 = {name:'wang',age:18,x:'man'}

// 函数
let fn:(a:number,b:number) =>number   //  函数结构，两个数字类型参数，返回数字
fn = function(m:number,n:number):number{
    return m + n
}


// 类型断言
// 尖括号语法
let someValue:string = 'this is a string'
let someLength:number = (<string>someValue).length
console.log(someLength)


