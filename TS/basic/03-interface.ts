
// function printLabel(labelledObj: { label: string }) {
//     console.log(labelledObj.label);
// }
  
// let myObj = { size: 10, label: "Size 10 Object" };
// printLabel(myObj);

// 重写这个接口
interface LabelledValue{
    label:string
}
function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}
// 参数对象必须包含一个label属性
let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);


// 可选属性
interface squreConfig{
    color?:string,
    width?:number
}
function creatSqure(configObj:squreConfig):{color:string,width:number}{
    let newSqure = {color:'white',width:100}
    if(configObj.color){
        newSqure.color = configObj.color
    }
    if(configObj.width){
        newSqure.width = configObj.width
    }
    return newSqure
}

// 函数类型
interface searchFunc{
    (name:string,age:number):boolean
}
let seachFn:searchFunc
seachFn = function(name:string,age:number):boolean{
    return false
}

// 可索引的类型
// class Dog{
//     name:string
// }
// class Animal extends Dog{
//     breed:string
// }
// interface Gou{
//     [x:string]:Animal
//     [y:string]:Dog
// }
