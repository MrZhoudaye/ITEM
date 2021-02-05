const numbers = [1, 2, 3, 4, 5];
const [y] = numbers;

// console.log(y);

// [a,b] = [1,2] 
// =====> a = 1,b = 2
// [y] = numbers
// =====> [y] = [1,2,3,4,5] ====> y = 1

function ifAr(arr,str){
    var res = false;
    arr.some(function(item){
        console.log(item)
        if(str.indexOf(item)>=0){
            res = true;
            return res
        }
    })
    console.log(res,"p")
    return res
}

var arr = ["1","2","3"]
var str = "rer1erere"
var res = ifAr(arr,str)
console.log(res)