const db = require("../db/mongo.js");
const argon2 = require("argon2");
// const bcrypt = require("bcrypt");
const bcrypt = require("bcryptjs");
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


exports.getSpecificUserByEmail = async (req, res)=>{
    console.log("get specific user. Should only be used as the login feature");
    try{
        console.log(req.params.email);
        const user = await items.collection("users").findOne({email: req.params.email});
        console.log(user);
        res.status(200).send(user);
    }
    catch(err){
        console.log("Error at getSpecificUser: "+ err);
        res.status(500).send(err);
    }
}


exports.getSpecificUser = async (req, res)=>{
    console.log("get specific user by uid");
    try{
        console.log(req.params.uid);
        const user = await items.collection("users").findOne({userID: Number(req.params.uid)});
        console.log(user);
        if(user == null){
            throw Error("Can not find the user with this uid");
        }
        else{
            res.status(200).send(user);
        }
    }
    catch(err){
        console.log("Error at getSpecificUser: "+ err);
        res.status(500).send(err);
    }
}

exports.getSellerInfo = async (req, res)=>{
    console.log("get specific seller ");
    console.log(req.params.uid);
    try{
        const user = await items.collection("users").findOne({userID: parseInt(req.params.uid)});
    console.log(user);
    res.status(200).send({seller: user});
    }
    catch(err){
        console.log("Error at getSpecificUser: "+ err);
        res.status(500).send(err);
    }
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
                    verification.email = true;
                    console.log("req.body.email: "+req.body.email);
                    console.log("req.body.password: "+req.body.password);
                    console.log("listOfUsers[i].password: "+listOfUsers[i].password);
                    // bcrypt.compare(req.body.password, listOfUsers[i].password, (err,result)=>{
                    //     if(err){
                    //         console.log("There is an error at logging in: "+err);
                    //     }
                    //     console.log("Result of hashing is: "+ result);
                    //     verification.password = result;
                        
                    // });
                    await bcrypt.compare(req.body.password, listOfUsers[i].password)
                    .then(res=>{
                        console.log("Result of hasing is: "+res);
                        verification.password = res;
                    })
                    .catch(err=>{
                        console.log("Having error at bcrypt.compare: "+ err);
                    })
                    
                    if(verification.password == true){
                        verification.user = listOfUsers[i];
                    }
                    break;       
            }
        }
        console.log("verification.email: "+ verification.email);
        console.log("verification.password: "+ verification.password);
        if(verification.email == false || verification.password == false){
            res.status(500).send({verification: false});
            throw Error("Either email or password is wrong");
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


exports.userLogIn = async (req,res)=>{
    console.log("Set login status for user");
    console.log(req.params.uid);
    const filter = {userID: req.params.uid};
    const options = {upsert: true};   //only update if there is no identical documents.

    const updateDoc = {
        $set: {
            name: req.body.name != null? req.body.name : "unknown",
            email: req.body.email != null? req.body.email : "unknown",
            status: req.body.status   //status might be login or logout
        }
    }
    try{
        await items.collection("users").updateOne(filter,updateDoc, options);
        const user = await items.collection("users").find({userID: req.params.uid}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
        res.status(200).send(user);
    }
    catch(err){
        console.log("Error at logging into user: "+err);
    }
    
}

exports.checkLoginStatus = async (req,res)=>{

    if(req.params.uid == 0){
        res.status(200).send({login: false});
    }
    else if(req.params.uid > 0){
        console.log("Checking for login status of designated user");
        try{
            const selectedUser = await items.collection("users").findOne({userID: req.params.uid});
            if(selectedUser.status == "login"){
                res.status(200).send({login: true})
            }
            else{
                res.status(200).send({login: false});
            }
        }
        catch(err){
            console.log("Error at checking for log in status: "+ err);
        }
    }
    else{
        res.status(500).send("Invalid request to check for login. Please check your uid");
    }
    
}


exports.updateUser = async (req,res)=>{
    console.log("updating user");
    const option = {upsert: true};
    const filter = {userID: Number(req.params.uid)};
    try{
        const previousUserInfo = await items.collection("users").findOne({userID: Number(req.params.uid)});
        console.log(previousUserInfo);
        const putBody = {
            name: req.body.name? req.body.name: previousUserInfo.name,
            password: req.body.password? await bcrypt.hash(req.body.password, 10) : previousUserInfo.password,
            email: req.body.email? req.body.email: previousUserInfo.email
        }
        console.log("New password is: "+ putBody.password);
        const updateDoc = {
            $set: putBody
        }
        try{
            await items.collection("users").updateOne(filter, updateDoc, option);
        }
        catch(err){
            console.log("Error with updating to mongodb");
        }
        
        const currentUserInfo = await items.collection("users").findOne({userID: Number(req.params.uid)});
        res.status(200).send(currentUserInfo.password);
        
    }
    catch(err){
        console.log("Error at updating user: "+ err);
        res.status(505).send(err);
    }
}