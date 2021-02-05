const person = {
  firstName: 'Lydia',
  lastName: 'Hallie',
  pet: {
    name: 'Mara',
    breed: 'Dutch Tulip Hound',
  },
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

// console.log(person.pet?.name);
// console.log(person.pet?.family?.name);
// console.log(person.getFullName?.());
// console.log(member.getLastName?.());
var errorMsg = []
var msg = '{应用变量维护页签第8行变量名称信息未填写；,应用变量维护页签第7行变量名称信息未填写；,应用变量维护页签第13行密文信息未填写；}'
msg = msg.slice(1,msg.length-1)
// console.log(msg)
var msgArr = msg.split("；,")
// console.log(msgArr)
for(let i = 0;i<msgArr.length;i++){
  var msgObj = {}
  var page = msgArr[i].split("第")[0]
  var num = msgArr[i].split("第")[1].split("行")[0]
  var detail = msgArr[i].split("第")[1].split("行")[1]
  msgObj.page = page
  msgObj.num = num
  msgObj.detail = detail
  errorMsg.push(msgObj)
}
console.log(errorMsg)
