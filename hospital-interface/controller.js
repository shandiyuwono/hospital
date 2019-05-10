const Model = require('./model')
const View = require('./view')

class Controller{
    static register(value) {
        Model.Employee.create(value, function(err,employees) {
            if(err){
                View.fail(err)
            }
            else{
                let employee = JSON.stringify(employees[employees.length-1])
                View.success(`save data success ${employee}. Total Employee: ${employees.length}`)
            }
        })
    }

    static login(options) {
        Model.Employee.findOne('username', options.username, function(err, employee){
            if(err) {
                View.fail(err)
            }
            else{
                if(employee !== null) {
                    if(employee.password === options.password) {
                        if(employee.isLoggedIn === true) {
                            View.fail(`user ${employee.username} still logged in. You need to logout first.`)
                        }
                        else{
                            Model.Employee.update(employee, 'isLoggedIn', true, function(err, data){
                                if(err){
                                    View.fail(err)
                                }
                                else{
                                    View.success(`user ${employee.username} logged in successfully`)
                                }
                            })     
                        }

                    }
                    else{
                        View.fail(`username/password wrong`)
                    }
                }
                else{
                    View.fail(`username/password wrong`)
                }
            }
        })
    }

    static addPatient(obj){
        Model.Employee.findOne('isLoggedIn', true, function(err, employee){
            if(err) {
                callback(err)
            }
            else{
                if(employee.position === "dokter") {
                    Model.Patient.create(obj, function(err, patients){
                        if(err){
                            callback(err)
                        }
                        else{
                            View.success(`data pasien berhasil ditambahkan. Total data pasien ${patients.length}`)
                        }
                    })      
                }
                else{
                    View.fail(`tidak memiliki akses untuk add patient`)
                }
            }

        })
    }

    static logout(){
        Model.Employee.findOne('isLoggedIn', true, function(err, employee){
            if(err){
                View.fail(err)
            }
            else{
                Model.Employee.update(employee, 'isLoggedIn', false, function(err){
                    if(err){
                        View.fail(err)
                    }
                    else{
                        View.success(`user has been succesfully logged out`)
                    }
                })
            }
        })
    }
}

module.exports = Controller