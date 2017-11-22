var Router = require('express').Router();
var webcontrollers = require('../controllers/');

const routes = [

    Router.get("/user" , webcontrollers.users.getUsersList ),
    Router.post("/updateuser" , webcontrollers.users.getUpdateUser ),
    Router.get("/delete-user/:id"  , webcontrollers.users.getDeleteUser),
    Router.post("/adduser"  , webcontrollers.users.getAddUser),
];

module.exports = routes;
