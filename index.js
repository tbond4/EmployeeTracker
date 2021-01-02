const db = require("./db");
const inquirer =require("inquirer");
const connection = require("./db/connection");

function initiateAction(){

    inquirer.prompt({
        name: "action",
        type: "list",
        message:"What would you like to do?",
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
        switch (ans.action) {
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
    inquirer.prompt([
        {
            name:"name",
            type:"input",
            message:"What it the Name of this Department?"
        }  
    ]).then( data =>{
        db.createDepartment(data).then(( )=> {
            console.log("Department Added!")
        });
        initiateAction(); 
    });
    
}
function createRole(){

    db.selectDepartments().then(res =>{
        const departmentOptions = res.map((department) => ({
            value: department.id,
            name: department.name
        }))
        inquirer.prompt([
            {
                name: "department_id",
                type: "list",
                message:"What department is this Role in?",
                choices:departmentOptions
            },
            {
                name:"title",
                type:"input",
                message:"What it the Title of this Role?"
            },
            {
                name:"salary",
                type:"input",
                message:"What it the Salary for this Role?"
            }
        ]).then( data =>{
            db.createRole(data);
            console.log("Role Added!");
            initiateAction(); 
        });
       
     });
   
}
function updateEmployeeRole(){

}  

initiateAction();

