const connection =require("./connection");

module.exports={
    selectDepartments(){
        return connection.query("SELECT * FROM department");
    },
    selectRoles(){
        return connection.query("SELECT * FROM role");
    },
    selectEmployees(){
        return connection.query("SELECT * FROM employee");
    },
};