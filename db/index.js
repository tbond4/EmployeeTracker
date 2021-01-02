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
        return connection.query("INSERT INTO role (title, salary, department_id) VALUES (?);", data.title, data.salary, data.department_id);
    },
    createDepartment(data){
        return connection.query("INSERT INTO department (title) VALUES (?);", data.name);
    },
    createEmployee(data){
        return connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?);",data.firstName, data,lastName, data.role_id, data.manager_id);
    },
    updateRole(data){
        "UPDATE products SET ? WHERE ?"
        return connection.query( "UPDATE products SET ? WHERE ? ;",data.role, data.name);
    }
};