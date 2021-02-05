const shape = {
    radius: 10,
    diameter() {
        console.log(this)
        return this.radius * 2;
    },
    perimeter: () => {
        console.log(this)
        return 2 * Math.PI * this.radius
    },
};

// console.log(shape.diameter());
// console.log(shape.perimeter());
var flag
try {
    flag = errorHandler()
}catch(e){
    console.log("e",e.message,e.name)
}
// flag = errorHandler()
if(flag){
    a1()
}else{
    b1()
}
function errorHandler(){
    // throw Error("error")
    // var a = true
    if(a == true){
        return true
    }else{
        return false
    }
}

function a1(){
    console.log("a1")
}
function b1(){
    console.log("b1")
}