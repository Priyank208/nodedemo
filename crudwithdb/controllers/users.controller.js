const fs = require('fs');
const bcrypt = require('bcrypt');

exports.getUsersList = (req , res) => { 
    model.User.findAll({}).then(data => {
        if(data){
            return res.send({"status" : "success","data" : data }); 
        }            
        else{
            return res.send({"status" : "success","data" : 'no record found' }); 
        }
    }).catch(err => {
        return res.send({"status" : "success","error" : err }); 
    });
}

exports.getUpdateUser = (req , res) => {     
    var params = req.body;
    var id = params.id;

    if(id){
        model.User.findOne({where:{'id':params.id}}).then(data => {
            var UpArr = {
                'firstname':params.firstname ,
                'lastname':params.lastname ,
                'email_id':params.email_id ,
                'status':params.status ,
            };  
            model.User.update(UpArr ,{where:{'id':params.id}}).then(data => {
                if(data[0]){
                    console.log('success');
                    return res.send({"status" : "1","msg" : 'User updated successfully' }); 
                } else{
                    console.log("Error");
                    return res.send({"status" : "0","msg" : 'Error updating user' }); 
                }
            });
        });         
    }
    else{
        return res.send({"status" : "0","msg" : 'required perameter missing'}); 
    }
}


exports.changePassword = (req,res) => {

    var requiredFields = {
        'token' : 'string',
        'new_password' : 'string',
        'old_password' : 'string',
    };

    var params = req.body;

    if(vh.validate(res , requiredFields , params))
    {
        model.User.update(  {'password' : params.new_password},
        {where:{'token' : params.token,'password' : params.old_password}}).then()
    }
}


exports.getAddUser = (req , res) => {     
    var params = req.body;
    
    model.User.findOne({where:{'email_id':params.email_id}}).then(data => {
        if(data) {
            return res.send({"status" : "0","msg" : 'Email Id already exists' }); 
        } else {
            model.User.create(req.body).then((data) => {
                console.log('Success');
                return res.send({"status" : "1","msg" : 'New user added successfully' }); 
            }).catch(err => {
                return res.send({"status" : "0","msg" : err}); 
            });
        }
    })
    .catch(err => {
        console.log(err);
        return res.send({"status" : "0","msg" : err}); 
    }); 
}


/**
 * @api {get} /user/delete/:id Delete
 * @apiHeader {Authorization} Authorization Users unique access-key.
 * @apiName Delete
 * @apiGroup Post
 */
exports.getDeleteUser = (req,res) => {
    model.User.destroy({where:{'id': req.params.id}}).then(data => {
        if(data){
            return res.send({"status" : "1","msg" : 'User deleted successfully' }); 
        }
        else{
            console.log('Error');
            return res.send({"status" : "0","msg" : 'error deleting user'}); 
        }
    }).catch(err => {
        console.log('Error');
        return res.send({"status" : "0","msg" : err});     
    })
}
