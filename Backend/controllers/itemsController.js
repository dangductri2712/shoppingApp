

const db = require("../db/mongo.js");
db.connectDb();
const items = db.client.db("shoppingAppDB");


exports.listAllItems = async (req,res)=> {
    console.log("list all items in shopping");
    const allItems = await items.collection("shoppingItems").find({}).sort({itemID: -1}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        // db.close();
    });
    if(allItems.length == 0){  //if there is no items
        res.status(204).send("There is no items in the db");
    }
    else{
        res.status(200).send(allItems);
    }
    
}

//insert items into the collection
exports.insertItem = async (req,res)=> {
    //find the id of the latest item in mongodb.
    var newID = 0;
    const listofItems = await items.collection("shoppingItems").find({}).sort({itemID: -1}).toArray(function (err,result){  //from largest to smallest
        if(err){
            items.close();
        }
        console.log(result);
    });    //get the list of item to know the largest ID to add in a new ID
    if(listofItems.length == 0 ){
        newID = 0;
    }
    else{
        newID = Number(listofItems[0].itemID) + 1;
    }
    

    console.log("Inserting item");
    const insertBody = {
        name: req.body.name != null? req.body.name : "unknown",
        description: req.body.description != null? req.body.description : "unknown",
        price: req.body.price != null? req.body.price : "unknown",
        itemID: newID.toString(),
        imageURI: req.body.imageURI != null ? req.body.imageURI : "https://backend-version1-4.onrender.com/unknown.jpg",
        itemLocation: req.body.location,
        seller: req.body.seller != null? req.body.seller : "0"
    }
    await items.collection("shoppingItems").insertOne(insertBody);
    res.status(201).send(insertBody);
}

//update the collection's document
exports.updateItem = async (req,res)=> {
    
    console.log("Updating item");
    const itemID = req.params.id;
    console.log("Item's ID is: "+ itemID);
    const filter = {itemID: itemID};
    const options = {upsert: true};   //only update if there is no identical documents.
    
    const updateDoc = {
        $set: {
            name: req.body.name != null? req.body.name : "unknown",
            description: req.body.description != null? req.body.description : "unknown",
            price: req.body.price != null? req.body.price : "unknown",
            itemID: itemID,
            sold: req.body.sold != null? req.body.sold : true ,
            imageURI: req.body.imageURI != null? req.body.imageURI : "https://backend-version1-4.onrender.com/unknown.jpg"
        }
    }
    try{
        await items.collection("shoppingItems").updateOne(filter,updateDoc, options);
        const allItems = await items.collection("shoppingItems").findOne({itemID:itemID});
        res.status(200).send(allItems);
    }
    catch(err){
        console.log(err);
    }
}

exports.viewSellItem = async (req,res)=>{
    try{
        const sellItems = await items.collection("shoppingItems").find({seller: req.params.uid}).toArray((err,result)=>{
            console.log(err);
        })
        res.status(200).send(sellItems);
    }
    catch(err){
        console.log("Error at getting sell items: "+ err);
    }
}

