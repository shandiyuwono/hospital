const Controller = require("./controller")

const argv = process.argv.slice(2) 
const command = argv[0]  
const value = argv.slice(1) 

switch(command) {
    case "register":
    Controller.register(value)
    break; 
    case "login":
    Controller.login({
        "username": value[0],
        "password": value[1]
    })
    break;
    case "addPatient":
    const obj = {
        "name" : value[0],
        "diagnosis": value.slice(1).join(" ")
    }
    Controller.addPatient(obj)
    break;
    case "logout":
    Controller.logout()
    break;
}
