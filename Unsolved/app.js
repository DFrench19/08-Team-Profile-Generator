const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");

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
                    engineer();
                    break;

                case "Yes, add intern":
                    intern();
                    break;

            }
        });
}
function intern() {
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
function engineer() {
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
function builtTeam() {
    console.log("Team has been built");
    const html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>My Team</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css">
        <script src="https://kit.fontawesome.com/c502137733.js"></script>
    </head>
    
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 jumbotron mb-3 team-heading">
                    <h1 class="text-center">My Team</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="team-area col-12 d-flex justify-content-center">
                    {{ team }}
                </div>
            </div>
        </div>
    </body>
    
    </html>`;
    fs.writeFile("./output/team.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("start");
    
}
function html(member) {
    return new Promise(function(resolve, reject) {
        const id = member.getId();
        const name = member.getName();
        const email = member.getEmail();
        const role = member.getRole();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
        } else {
            const officePhone = member.getOfficeNumber();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">Office Phone: ${officePhone}</li>
            </ul>
            </div>
        </div>`
        }
        console.log("adding team member");
        fs.appendFile("./output/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
    
   
}        
        
    
    

prompt()
addMembers();
startHtml();
html()
builtTeam()
