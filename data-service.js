//const file = require('fs');
//const { resolve } = require('path');
//let employees = [];
//let departments = [];
const Sequelize = require('sequelize');
var sequelize = new Sequelize('jjquzujb', 'jjquzujb', 'fMIp2O5IQVGZB9gbd2DOLoLEsrZ-MPTL', {
 host: 'jelani.db.elephantsql.com',
 dialect: 'postgres',
 port: 5432,
 dialectOptions: {
 ssl: true
},
query:{raw: true} // update here. You need it.
});

sequelize.authenticate().then(()=> console.log('Connection success.'))
.catch((err)=>console.log("Unable to connect to DB.", err));

 module.exports.initialize = function(){
  return new Promise(function (resolve, reject) {

    sequelize.sync().then(function(){


resolve();

    }).catch(function(err){
    reject("Unable to sync data");
    })
   });
};


var Employee = sequelize.define('Employee', {
  employeeNum : {type : Sequelize.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  firstName : Sequelize.STRING,
  lastName : Sequelize.STRING,
  email : Sequelize.STRING,
  SSN : Sequelize.STRING,
  addressStreet : Sequelize.STRING,
  addressCity : Sequelize.STRING,
  addressState :  Sequelize.STRING,
  addressPostal : Sequelize.STRING,
  maritalStatus : Sequelize.STRING,
  isManager : Sequelize.BOOLEAN,
  employeeManagerNum : Sequelize.INTEGER,
  status : Sequelize.STRING,
  department : Sequelize.INTEGER,
  hireDate : Sequelize.STRING
});

var Department = sequelize.define('Department', {

  departmentId : {type : Sequelize.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  departmentName : Sequelize.STRING

});


module.exports.getAllEmployees = function () {
  return new Promise(function (resolve, reject) {

    sequelize.sync().then(function(){

Employee.findAll().then(function(arr) {

  resolve(arr);
}).catch(function(err){

  reject("No results returned");
})


    }).catch(function(err){
      reject("Error sync");
     })
  
   });
};

module.exports.getManagers = function () {
  return new Promise(function (resolve, reject) {
    reject();
   });
};

module.exports.getDepartments = function () {
  return new Promise(function (resolve, reject) {
    sequelize.sync().then(function() {
      Department.findAll().then(function(arr){
      
      resolve(arr);
      
      }).catch(function(err) {
      
        reject("No results returned");
      })
      
          }).catch(function(err){
            reject("Sync Issues");
      
          })
         
   });
};
 

//ASSINGMENT 3

module.exports.addEmployee = function(employeeData){
  return new Promise(function (resolve, reject) {
    sequelize.sync().then(function() {
      employeeData.isManager = (employeeData.isManager) ? true : false;

      for(val in employeeData)
      {
        if(employeeData[val] == "")
        employeeData[val] = null;
      }

      Employee.create(employeeData).then(function() {

        resolve();

      }).catch(function(err){
        reject("Unable to create Employee");
      })

    }).catch(() => {

      reject("Sync Error!");
    })

   });
};


module.exports.getEmployeesByStatus = function(m_status)
{

  return new Promise(function (resolve, reject) {

    sequelize.sync().then(function(){

      Employee.findAll({status : m_status}).then(function(arr) {

        resolve(arr);
      }).catch(function(err){
        reject("No results returned");
      })

    }).catch(function(err){

      reject("Sync error");
    })
  
   });
};

module.exports.getEmployeesByDepartment = function(m_department){

  
  return new Promise(function (resolve, reject) {

    sequelize.sync().then(function() {
Employee.findAll({department : m_department}).then(function(arr){

resolve(arr);

}).catch(function(err) {

  reject("No results returned");
})

    }).catch(function(err){
      reject("Sync Issues");

    })
   
   });

}


module.exports.getEmployeesByManager = function(m_manager){

  return new Promise(function (resolve, reject) {
    sequelize.sync().then(function() {
      Employee.findAll({employeeManagerNum : m_manager}).then(function(arr){
      
      resolve(arr);
      
      }).catch(function(err) {
      
        reject("No results returned");
      })
      
          }).catch(function(err){
            reject("Sync Issues");
      
          })
         
   });
}


module.exports.getEmployeeByNum = function(num){
  return new Promise(function (resolve, reject) {
    sequelize.sync().then(function() {
      Employee.findAll({employeeNum : num}).then(function(arr){
      
      resolve(arr[0]);
      
      }).catch(function(err) {
      
        reject("No results returned");
      })
      
          }).catch(function(err){
            reject("Sync Issues");
      
          })
         
   });
} 


module.exports.updateEmployee = function(employeeData){
  return new Promise(function (resolve, reject) {
    employeeData.isManager = (employeeData.isManager) ? true : false;

    for(val in employeeData)
      {
        if(employeeData[val] == "")
        employeeData[val] = null;
      }

      Employee.update(employeeData, {where: {employeeNum : employeeData.employeeNum}}).then(() =>{

        resolve();
      }).catch((err) => {
        reject("Unable to Update Employee");
      })
   });



};


module.exports.addDepartment = function(departmentData)
{

return new Promise((resolve, reject) => {

  for(val in departmentData)
  {
    if(departmentData[val] == "")
    departmentData[val] = null;
  }
  Department.create().then(() => {

    resolve();
  }).catch((err) => {

    reject("Unable to Create Department");
  })


})


}


module.exports.updateDepartment = function(departmentData)
{
  return new Promise((resolve, reject) => {

    for(val in departmentData)
    {
      if(departmentData[val] == "")
      departmentData[val] = null;
    }

    Department.update(departmentData, {where: {departmentId : departmentData.departmentId}}).then(() =>{

      resolve();
    }).catch((err) => {

      reject("Unable to update Department");
    })

  })



}

module.exports.getDepartmentById - function(id)
{
  return new Promise((resolve, reject) => {

Department.findAll({departmentId : id}).then(function(arr){
      
      resolve(arr[0]);
      
      }).catch(function(err) {
      
        reject("No results returned");
      })
      

  })


}


module.exports.deleteEmployeeByNum = function(empNum)
{
  return new Promise((resolve, reject) => {

    Employee.destroy({where : {empNum : data.employeeNum}}).then(() => {

      resolve();

    }).catch((err) => {

      reject("Unable to delete");
    })

  })



}