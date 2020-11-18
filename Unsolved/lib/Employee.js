// TODO: Write code to define and export the Employee class
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");

class Employee {
    constructor(name, id, emails) {
        this.name = name;
        this.id = id;
        this.emails = emails;
    
    }
}