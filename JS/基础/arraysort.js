
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1)
    }
    return function (a,b) {
        // 下面一行代码对字符串和数字均有效
        // 你可以根据自己的需求定制它
        var a = Number(a)
        var b = Number(b)
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
        return result * sortOrder
    }
  }
  
  // 待处理数据
  var data = [
    {name: 'tom4', mdate: '202012'},
    {name:'tom2', mdate:'202001'},
    {name: 'tom1', mdate: '202008'},
    {name: 'tom3', mdate: '202005'}
  ]
  var data1 = [
    {name:"1",grand:"1"},
    {name:"2",grand:"3"},
    {name:"3",grand:"12"},
  ]
  
  // 使用：按照属性 mdate 给data排序
  let sortedArr = data.sort(dynamicSort("mdate"))
  console.log(sortedArr)

  let sort = data1.sort(dynamicSort("grand"))
  console.log(sort)