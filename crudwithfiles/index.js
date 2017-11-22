var app  = require('express')(),
    bodyParser = require('body-parser'),
    fs = require('fs'); // require for read/write file

app.use( bodyParser.json() );  // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

var users = [];

fs.readFile('user.json', (err, data) => {  
    if (err) throw err;
    users = JSON.parse(data);
});


// View all user data
app.get('/users',function(req,res){
    return res.send({"status" : "Success","data" : users});  
});

// View single user data
app.get('/users/:id',function(req,res){
    var userData = users.find(item => item.id === parseInt(req.params.id))
    if(!userData){
      return res.send({"status" : "User Not found"});
    }else{
      return res.send({"status" : "Success","data" : userData});  
    }    
});

// Delete user
app.get('/users/delete/:id',function(req,res){

    let userid  = parseInt(req.params.id);
    let index = users.findIndex(function(userdata) { return userdata.id == userid; });
    if(index){
      users.splice(index,1);
      var json = JSON.stringify(users);
      fs.writeFile("user.json", json, function(err) {
          if(err) {
            return res.send({"status" : "Fail","error" : err });  
          }else{
            return res.send({"status" : "Success","data" : users });  
          }
      });
    }else{
      return res.send({"status" : "Error","Message" : "No user found" }); 
    } 
});
// Edit user
app.post('/users/edit/:id',function(req,res){
    let id  = parseInt(req.params.id);    
    users.find(function(item, i){      
      if(item.id === id){
          item.name = req.body.name;
          item.username = req.body.username;
          item.email = req.body.email;
      }
    });
    var json = JSON.stringify(users);
    fs.writeFile("user.json", json, function(err) {
        if(err) {
            return res.send({"status" : "Fail","error" : err });  
        }else{
          return res.send({"status" : "Success","data" : users });  
        }
    });
});

// Add new user
app.post('/users/add',function(req,res){    
    let req_param = req.body;
    req_param['id'] = users.length  + parseInt(1);
    users.push(req_param);    
    if(!writeJsondata()){
      return res.send({"status" : "Success","data" : users });  
    }else{
      return res.send({"status" : "Fail","error" : result});  
    }
});

var writeJsondata = () => { 
  var json = JSON.stringify(users);
  fs.writeFile("user1.json", json, function(err) {
      if (err) return err;
  });
} 

/*var writeJsondata(userdata){

  var json = JSON.stringify(userdata);
  fs.writeFile("user.json", json, function(err) {
    if (err) throw err;
    
  });
}*/

//start Server
var server = app.listen(3001,function(){
   console.log("Listening to port %s",server.address().port);
});