const express = require('express');
const app = express();

const Items = require("../controllers/itemsController");
const Users = require("../controllers/usersController");
const History = require("../controllers/historyController");
const router = express.Router();


router.route('/items').get((req,res)=> {   
    Items.listAllItems(req,res);
})
.post((req,res)=> {
    Items.insertItem(req,res);
})

router.route('/items/:id').put((req,res)=> {
    Items.updateItem(req,res);
})

router.route('/users/signup').get((req,res)=>{
    Users.listAllUsers(req,res);
})
.post((req,res)=>{
    Users.insertUser(req,res);
})

router.route('/users/login').post((req,res)=>{
    Users.checkForLogin(req,res);
})

router.route('/users/history/:uid').get((req,res)=>{
    History.viewHistory(req,res);
})

module.exports = router;