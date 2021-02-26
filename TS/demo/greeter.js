var Student1 = /** @class */ (function () {
    function Student1(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student1;
}());
function greeter1(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user1 = new Student1("Jane", "M.", "User");
document.body.innerHTML = greeter1(user1);

