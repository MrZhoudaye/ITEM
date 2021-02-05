const person = {
    name: 'Lydia',
    age: 21,
};
console.log(Object.entries(person))
// [ [ 'name', 'Lydia' ], [ 'age', 21 ] ]
for (const [x, y] of Object.entries(person)) {
    console.log(x, y);
    // name Lydia
    // age 21
}

let config = {
    alert:setInterval(function() {
        console.log("alert")
    },1000)
}
config = null