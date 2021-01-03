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
    
    db.selectRoles().then(res=>{
        const roleChoices = res.map((role) => ({
            name:role.title,
            value:role.id
    }))
    db.selectEmployees().then(res=>{
        const managerChoices = res.map((manager) => ({
            name: [manager.first_name, manager.last_name],
            value: manager.id
    }))
    inquirer.prompt([{
        name:"firstName",
        type:"input",
        message:"What is the new employees First Name?",
    },
    {
        name:"lastName",
        type:"input",
        message:"What is the new employees Last Name?",
    },
    {
        name:"role_id",
        type:"list",
        message:"Choose the Employees Role",
        choices: roleChoices
    },
    {
        name:"manager_id",
        type:"list",
        message:"Choose the Employees Manager",
        choices: managerChoices
    }
    ]).then(data =>{
        db.createEmployee(data).then(()=>{
            console.log("Employee Added!")
        });
        initiateAction(); 
    });

});

});

    
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
            name: department.title,
            value: department.id
           
        }));
        inquirer.prompt([
            {
                name: "department_id",
                type: "rawlist",
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
            db.createRole(data).then(()=>{
                console.log("Role Added!")
               
            });
            initiateAction(); 
        });
       
     });
   
}
function updateEmployeeRole(){
    db.selectRoles().then(res=>{
        const roleChoices = res.map((role) => ({
            name:role.title,
            value:role.id
    }))
    db.selectEmployees().then(res=>{
        const employeeChoices = res.map((employee) => ({
            name: [employee.first_name, employee.last_name],
            value: employee.id
    }))
    inquirer.prompt([
    {
        name:"employee_id",
        type:"list",
        message:"Choose the Employee you want to change the role for",
        choices: employeeChoices
     },
    {
        name:"role_id",
        type:"list",
        message:"Choose the new Role",
        choices: roleChoices
    }
    ]).then(data =>{
        db.updateRole(data).then(()=>{
            console.log("Employee Updated!")
        });
        initiateAction(); 
    });

});

});
}  

initiateAction();

