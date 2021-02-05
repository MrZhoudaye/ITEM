var arr1 = [
    {"key":"iso",value:1},
    {"key":"iso",value:2}
]
var arr2 = [
    {"key":"iso",value:3},
    {"key":"iso",value:4}
]
var arr3 = [
    {"key":"iso",value:5},
    {"key":"iso",value:6}
]
var arr4 = [
    {"key":"iso",value:7},
    {"key":"iso",value:8}
]

var newArr = []
newArr.push(arr1,arr2,arr3,arr4)
// console.log(newArr)
var resultArr = []
for(var i = 0;i<newArr.length;i++){
    resultArr.push(newArr[i][newArr[i].length - 1])
}
console.log(resultArr)

var arr = [
    {
        a:"1",
        b:"2"
    },
    {
        a:"3",
        b:"4"
    },{
        a:"5",
        b:"6"
    },{
        a:"7",
        b:"8"
    }
]
var newList = [];
for(var i=0;i<arr.length;i++){
    for(var key in arr[i]){
        if(key == 'a'){
            newList.push(arr[i][key])
        }
    }
}
console.log(newList)