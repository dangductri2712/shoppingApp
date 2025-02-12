const express = require('express');
const app = express();

const Items = require("../controllers/itemsController");
const Users = require("../controllers/usersController");
const History = require("../controllers/historyController");
const Files = require("../controllers/filesController");
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

router.route('/items/seller/:uid').get((req,res)=>{
    Items.viewSellItem(req,res);
})
//routes to check for users
router.route('/users/signup').get((req,res)=>{
    Users.listAllUsers(req,res);
})
.post((req,res)=>{
    Users.insertUser(req,res);
})

//get specific users based on email. This is called when user login.
router.route('/user/email/:email').get((req,res)=>{
    Users.getSpecificUserByEmail(req,res);
})

router.route('/user/:uid').get((req,res)=>{
    Users.getSpecificUser(req,res);
})
.put((req,res)=>{
    Users.updateUser(req,res);
})

//get seller info
router.route('/user/seller/:uid').get((req,res)=>{
    Users.getSellerInfo(req,res);
})

router.route('/users/login').post((req,res)=>{
    Users.checkForLogin(req,res);
})

router.route('/user/history/:uid').get((req,res)=>{
    History.viewHistory(req,res);
})


router.route('/user/history/:hid').put((req,res)=>{
    History.updateItemHistory(req,res)
})
router.route('/user/history/:uid/:itemID').get((req,res)=>{
    History.viewItemHistory(req,res);
})

router.route('/user/history').post((req,res)=>{
    History.insertHistory(req,res);
})

// router.route('/users/:uid').put((req,res)=>{
//     Users.userLogIn(req,res);
// })
// .get((req,res)=>{
//     Users.checkLoginStatus(req,res);
// })

router.route('/upload').post((req,res)=>{
    Files.uploadFile(req,res);
})
.put((req,res)=>{
    Files.updateFile(req,res)
})


module.exports = router;