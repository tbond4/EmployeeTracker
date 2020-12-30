const db = require("./db");
const inquirer =require("inquirer");
const connection = require("./db/connection");

function initiateAction(){

    inquirer.prompt({
        name: "action",
        type: "list",
        messege:"What would you like to do?",
        choices:[
                "View Employees",
                "View Departments",
                "View Roles",
                "Create Deparment",
                "Create Role",
                "Create Employee",
                "Quit"
        ]
    }).then(ans => {
        switch (ans) {
            case "View Employees":
                
                return;
            case "View Departments":
                
                return;
            case "View Roles":
                
                return;
            case "Create Deparment":
                
                return;
            case "Create Role":
                
                return;
            case "Create Employee":
                
                return;
            default:
                connection.end();
        }

    });
}
