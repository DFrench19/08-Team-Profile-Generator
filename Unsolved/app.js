const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Choice = require("inquirer/lib/objects/choice");



const teamArray = []




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function prompt() {
    inquirer.prompt([
        {
            message: "Team Generator! Enter Team Name!",
            name: "teamname"
        }
    ])
        .then(function (userData) {
            const teamName = userData.teamName
            teamArray.push(teamName)
            addManager();
        })
}

function addManager() {
    inquirer.prompt([
        {
            message: "What is your managers name?",
            name: 'name'
        },
        {
            message: "What is your managers eamil?",
            name: "email"
        },
        {
            type: "number",
            message: "What is your managers office number?",
            name: "officeNumber"
        }
    ])

        .then(function (userData) {
            const id = 1
            const name = userData.name
            const email = userData.email
            const members = new Manager(id, name, email)
            teamArray.push(members)

            addMembers();
        })

}

function addMembers() {
    inquirer.prompt([
        {
            type: "list",
            message: "Enter more members if needed!",
            choices: ["No, team is built", "Yes, add engineer", "Yes, add intern"],
            name: "addMember"
        }
    ])

        .then(function (data) {

            switch (data.addMemberData) {
                case "No, my team is built":
                    builtTeam();
                    break;
                case "Yes, add engineer":
                    Engineer();
                    break;

                case "Yes, add intern":
                    Intern();
                    break;

            }
        });
}
function Intern() {
    inquirer.prompt([
        {
            message: "What is your interns name?",
            name: "name"
        },
        {
            message: "What is your interns email?",
            name: "email"
        },
        {
            message: "Where does your interns go to school?",
            name: "school"
        }
    ])

        .then(function (data) {
            const id = finalTeamArray.length + 1
            const name = data.name
            const email = data.email
            const school = data.school
            const teamMember = new Intern(name, id, email, school)
            teamArray.push(teamMember)
            addTeamMembers()
        });

};
function Engineer() {
    inquirer.prompt([
        {
            message: "What is your engineers name?",
            name: "name"
        },
        {
            message: "What is your engineer's email?",
            name: "email"
        },
        {
            message: "What is your engineer's Github?",
            name: "github"
        }
    ])

        .then(function (data) {
            const id = finalTeamArray.length + 1
            const name = data.name
            const github = data.github
            const email = data.email
            const teamMember = new Engineer(name, id, email, github)
            teamArray.push(teamMember)
            addTeamMembers()
        });

};

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
