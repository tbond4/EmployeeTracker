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
                "Update Employee Role",
                "Quit"
        ]
    }).then(ans => {
        switch (ans) {
            case "View Employees":
                viewEmployees();
                return;
            case "View Departments":
                viewDepartments();
                return;
            case "View Roles":
                viewRoles();
                return;
            case "Create Deparment":
                createDepartments();
                return;
            case "Create Role":
                createRole();
                return;
            case "Create Employee":
                createEmployee();
                return;
            case "Update Employee Role":
                updateEmployeeRole();
                return;
            default:
                connection.end();
        }

    });
}
function viewEmployees(){

    db.selectEmployees().then(res =>{
       console.table(res);
       initiateAction(); 
    });
}
function viewDepartments(){
    db.selectDepartments().then(res =>{
        console.table(res);
        initiateAction(); 
     });
}
function viewRoles(){
    db.selectRoles().then(res =>{
        console.table(res);
        initiateAction(); 
     });
}
function createEmployee(){
    
}
function createDepartments(){
    
}
function createRole(){

    db.selectDepartments().then(res =>{
        const departmentOptions = res.map((department) => ({
            value: department.id,
            name: department.name
        }))
        inquirer.prompt([
            {
                name: "departmentChoice",
                type: "list",
                messege:"What would you like to do?",
                choices:departmentOptions
            }
        ])
        initiateAction(); 
     });

}
function updateEmployeeRole(){
    
}

initiateAction();

