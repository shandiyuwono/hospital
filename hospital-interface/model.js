const fs = require('fs')

class Patient {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.diagnosis = obj.diagnosis
  }
  static readFile(callback) {
    fs.readFile('./patients.json', 'utf8', function(err, patients){
      if(err) {
        callback(err)
      }
      else{
        let parse = JSON.parse(patients)
        callback(null, parse)
      }
    })
  }

  static writeFile(data, callback){
    let stringify = JSON.stringify(data, null, 2)
    fs.writeFile('./patients.json', stringify, function(err){
      if(err){
        callback(err)
      }
      else{
        callback(null)
      }
    })
  }
  static findAll(callback){
    Patient.readFile(function(err, patients){
      if(err){
        callback(err)
      }
      else{
        for(let i = 0; i <= patients.length-1; i++){
          patients[i] = new Patient(patients[i])
        }

        callback(null, patients)
      }
    })
  }
  static create(obj, callback) {
    Patient.findAll(function(err, patients){
      if(err){
        callback(err)
      }
      else{
        let id = null
        if(patients.length === 0) {
          id = 1
        }
        else{
          id = patients[patients.length-1].id + 1
        }
        let newPatient = {
          "id" : id,
          "name": obj.name,
          "diagnosis": obj.diagnosis
        }
        patients.push(newPatient)
  
        Patient.writeFile(patients, function(err){
          if(err){
            callback(err)
          }
          else{
            callback(null, patients)
          }
        })
      }
    })
  }
}

class Employee {
  constructor(obj) {
    this.name = obj.name
    this.position = obj.position
    this.username = obj.username
    this.password = obj.password
    this.isLoggedIn = obj.isLoggedIn
  }

  static readFile(callback){
    fs.readFile('./employee.json', 'utf8', function(err, employee) {
      if(err) {
        callback(err)
      }
      else {
        let parse = JSON.parse(employee)
        callback(null, parse)
      }
    })
  }

  static writeFile(data, callback){
    let stringify = JSON.stringify(data, null, 2)
    fs.writeFile('./employee.json', stringify, function(err){
      if(err){
        callback(err)
      }
      else{
        callback(null)
      }
    })
  }

  static findAll(callback) {
    //manggil readfile
    Employee.readFile(function(err, data) {
      if(err) {
        callback(err)
      }
      else{
        for(let i = 0; i <= data.length-1; i++) {
          data[i] = new Employee(data[i])
        }
        callback(null, data)
      }
    })
  }

  static findOne(field, value, callback){ // login budi 12345 // field = username, value = budi 
    //manggil findall
    Employee.findAll(function(err, employees){
      if(err){
        callback(err)
      }
      else{
        let found = null
        for(let i = 0; i <= employees.length-1; i++) {
          if(employees[i][field] === value){
            found = employees[i]
          }
        }
        callback(null, found)
      }
    })
  }

  static update(obj, field, value, callback){
    Employee.findAll(function(err,employees){
      if(err){
        callback(err)
      }
      else{
        for(let i = 0; i <= employees.length-1; i++) {
          if(obj.name === employees[i].name) {
            employees[i][field] = value
          }
        }
        Employee.writeFile(employees, function(err){
          if(err){
            callback(err)
          }
          else{
            callback(null)
          }
        })
      }
    })
  }

  static create(value, callback){
    let newEmployee = {
      "name" : value[0],
      "position" : value[2],
      "username" : value[0],
      "password" : value[1],
      "isLoggedIn": false,
    }

    Employee.findAll(function(err,data) {
      if(err){
        callback(err)
      }
      else{
        data.push(new Employee(newEmployee))

        Employee.writeFile(data, function(err){
          if(err){
            callback(err)
          }
          else{
            callback(null, data)
          }
        })
      }
    })
  }

  static delete(){

  }
}

module.exports = {Patient, Employee}
