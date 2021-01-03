const connection =require("./connection");

module.exports={
    selectDepartments(){
        return connection.query("SELECT * FROM department;");
    },
    selectRoles(){
        return connection.query("SELECT * FROM role;");
    },
    selectEmployees(){
        return connection.query("SELECT * FROM employee;");
    },
    createRole(data){
        return connection.query("INSERT INTO role SET ?;", {title:data.title, salary:data.salary, department_id:data.department_id});
    },
    createDepartment(data){
        return connection.query("INSERT INTO department (title) VALUES (?);", data.name);
    },
    createEmployee(data){
        return connection.query("INSERT INTO employee SET ?;",{first_name:data.firstName, last_name:data.lastName, role_id: data.role_id, manager_id: data.manager_id});
    },
    updateRole(data){
      
        return connection.query( "UPDATE employee SET ? WHERE ? ;",{role_id:data.role_id},{id:data.employee_id});
    }
};