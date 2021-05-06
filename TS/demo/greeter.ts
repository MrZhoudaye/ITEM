class Student1 {
    fullName: string;
    constructor(public firstName:string, public middleInitial:string, public lastName:string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter1(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user1 = new Student1("Jane", "M.", "User");

document.body.innerHTML = greeter1(user1);