const axios  = require('axios');
const db = require("../db/mongo.js");
db.connectDb();
const items = db.client.db("shoppingAppDB");

exports.insertHistory = async (req,res)=>{
    console.log("storing history of purchase");
    console.log(req.body);

    var newID = 0;
    const listofHistories = await items.collection("history").find({}).sort({hid: -1}).toArray(function (err,result){  //from largest to smallest
        if(err){
            items.close();
        }
        console.log(result);
    });    //get the list of item to know the largest ID to add in a new ID
    console.log(listofHistories);
    if(listofHistories.length > 0 && (listofHistories[0].hid != null || listofHistories[0].hid != undefined)){
        console.log("There is more than 1 items");
        newID = Number(listofHistories[0].hid) + 1;
        console.log("newID is: "+ newID);
    }
    
    const historyBody = req.body;
    for(var i=0; i< historyBody.length; i++){
        historyBody[i].hid =  newID;
        newID ++;
    }
    // historyBody.hid = newID.toString();
    console.log("historyBody: "+historyBody);
    await items.collection("history").insertMany(historyBody)
    .then(response=>{
        console.log("Successfully save the history");
        res.status(201).send(historyBody);
    })
    .catch(err=>{
        res.status(500).send(err);
        console.log("There is an issue saving the history: "+err);
    })
}

exports.viewHistory = async(req,res)=>{
    console.log("Viewing history");
    try{
        const allHistory = await items.collection("history").find({buyer: req.params.uid}).sort({buyDate: -1}).toArray(function(err,result){
            if(err) throw err;
            console.log(result);
        });
        var tempHistory = allHistory;
        for(var i =0; i< allHistory.length; i++){
            // await axios.get("https://backend-version1-4.onrender.com/user/seller/"+ tempHistory[i].seller)
            await axios.get("http://localhost:8080/user/seller/"+ tempHistory[i].seller)
            .then(response=>{
                console.log(response.data.seller);
                tempHistory[i].sellerName = response.data.seller.name;
            })
        }
        console.log("allHistory: "+allHistory);
        res.status(200).send(tempHistory);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Can not get the history of this user");
    }
}

exports.viewItemHistory = async (req,res)=>{
    console.log("Finding all buyer for this item");
    const allHistory = await items.collection("history").find({itemID: req.params.itemID}, {seller: req.params.itemID}).sort({buyDate: -1}).toArray(function(err,result){
        if(err){
            console.log(err);
            res.status(500).send("Can not trace all buyers for this product");
        }
    })
    const tempHistory = allHistory;
    for(var i =0; i< allHistory.length; i++){
        await axios.get("https://backend-version1-4.onrender.com/user/"+ tempHistory[i].buyer)
        .then(response=>{
            console.log(response.data.name);
            tempHistory[i].buyerName = response.data.name;
            tempHistory[i].buyerEmail = response.data.email;
        })
    }
    res.status(200).send(tempHistory);
}

exports.updateItemHistory = async (req,res)=>{
    console.log("Updating history");
    var tempHistory = "";

    try{
        const oldHistory = await items.collection("history").findOne({hid: Number(req.params.hid)});
        tempHistory = oldHistory;
        console.log("tempHistory: " + tempHistory);
        if(oldHistory.hid == null){
            console.log("There is none in tempHistory in updateItemHistory");
        }
        const filter = {hid: Number(req.params.hid)};
        const options = {upsert: true};   //only update if there is no identical documents.
        const updateDoc = {
            $set: {
                hid: tempHistory.hid,
                itemID: req.body.itemID != null? req.body.itemID: tempHistory.itemID,
                itemName: req.body.itemName != null ? req.body.itemName: tempHistory.itemName,
                price: req.body.price != null? req.body.price: tempHistory.price,
                seller: req.body.seller != null? req.body.seller: tempHistory.seller,
                buyer: req.body.buyer != null? req.body.buyer: tempHistory.buyer,
                buyDate: req.body.buyDate != null? req.body.buyDate: tempHistory.buyDate,
                imageURI: req.body.imageURI != null? req.body.imageURI: tempHistory.imageURI,
                amount: req.body.amount != null? req.body.amount: tempHistory.amount,
                status: req.body.status != null? req.body.status : tempHistory.status
            }
        }
        
        const newHistory = await items.collection("history").updateOne(filter,updateDoc);
        // const newHistory = await items.collection("history").findOne({hid: Number(req.params.hid)});
        console.log(newHistory);
        res.status(200).send(newHistory);
    
    }
    catch(err){
        console.log(err);
        res.status(502).send("Can not update history: "+err);
    }
    
}