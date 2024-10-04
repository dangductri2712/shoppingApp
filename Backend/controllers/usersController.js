const db = require("../db/mongo.js");
const argon2 = require("argon2");
const bcrypt = require("bcrypt");
db.connectDb();
const items = db.client.db("shoppingAppDB");



exports.listAllUsers = async (req,res)=>{
    console.log("list all users");
    const allUsers = await items.collection("users").find({}).toArray(function(err,result){
        if(err) throw err;
        console.log(result);
    });
    res.status(200).send(allUsers);
}


exports.insertUser = async (req,res)=>{
    console.log("insert user");
   
    try{
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        console.log("The new hashedPassword is: "+ hashedPassword);
        const listOfUsers = await items.collection("users").find({}).sort({userID: -1}).toArray(function(err,result){
            if(err) throw err;
            console.log(result);
        });
        const addedUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            userID: 0
        }
        
        //CHECK IF THE USER HAS BEEN USED BEFORE OR NOT
        

        if(listOfUsers.length == 0){  //if there is none yet
            items.collection("users").insertOne(addedUser);
        }
        else{
            var existingEmail = false;
            for(var i = 0; i< listOfUsers.length; i++){
                if(listOfUsers[i].email == addedUser.email){
                    existingEmail = true;
                    res.send("Email has been taken");
                    break;
                }
            }
            if(existingEmail == false){
                const nextUserID = listOfUsers[0].userID + 1;
                addedUser.userID = nextUserID;
                if(addedUser.password == "" || addedUser.password == null || addedUser.password == "undefined"){
                    console.log("Hashed password can not be empty");
                    throw Error("Hashed password can not be empty");                
                }
                else{
                    console.log("addedUser.password: "+addedUser.password);
                    await items.collection("users").insertOne(addedUser)
                    .then((res)=>{
                        console.log("addedUser.password: "+ addedUser.password);
                        console.log("Successfully add in user");
                    })
                    .catch(err=>{
                        console.log("There is an issue when inserting in user");
                    });
                    res.status(200).send("Successfully add in new user");
                }
            }
            else{
                throw Error("Email existed");   
            }
        }
        
        
    }
    catch(err){
        console.log(err);
    }
}

exports.checkForLogin = async (req,res)=>{
    console.log("Checking for logging in");
    var verification = {email: false, password: false, user: {}};
    try{
        const listOfUsers = await items.collection("users").find({}).sort({userID: -1}).toArray(function(err,result){
            if(err) throw err;
            console.log(result);
        });
        
        for(var i=0; i< listOfUsers.length; i++){
            if(req.body.email == listOfUsers[i].email){
                console.log("req.body.email: "+req.body.email);
                console.log("req.body.password"+req.body.password);
                console.log("listOfUsers[i].password: "+listOfUsers[i].password);

                verification.password = await bcrypt.compare(req.body.password, listOfUsers[i].password);
                verification.email = true;
                verification.user = listOfUsers[i];
                break;
            }
        }

        if(verification.email == false || verification.password == false){
            res.status(500).send({verification: false});
        }
        else if(verification.email == true && verification.password == true){
            console.log("Verification successfull");
            res.status(200).send({user: verification.user});
        }
    }
    catch(err){
        console.log(err);
    }
}