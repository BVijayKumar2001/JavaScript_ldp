/*
Refactor the following function into a one-liner:
const printName = (name) => {
    return “Hi” + name;
  } */

const printName = name => {document.write("Hi "+ name)}
printName("Vijay Kumar")

/*
Rewrite the following code using template literals
const printBill = (name, bill) => {
     return “Hi “ + name + “, please pay: “ + bill;
  }
*/
document.write("<br>")
const printBill=(name,bill)=>{ document.write(`Hi ${name}, please pay: ${bill}`)}
printBill("Vijay",250)

/*
Modify the following code such that the object properties are destructured and logged.
const person = {
   name: “Noam Chomsky”,
   age: 92
  }
           
let name = person.name;
let age = person.age;
console.log(name);
console.log(age);
*/
const person ={
  pname: "Naom Chomsky",
  age:92
}
let {pname,age} = person;
document.write("<br>"+pname +"<br>"+ age)