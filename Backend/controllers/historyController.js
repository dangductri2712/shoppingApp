const axios  = require('axios');
const db = require("../db/mongo.js");
db.connectDb();
const items = db.client.db("shoppingAppDB");

exports.insertHistory = async (req,res)=>{
    console.log("storing history of purchase");
    console.log(req.body);
    const historyBody = req.body;
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
            await axios.get("http://localhost:8080/user/seller/"+ tempHistory[i].seller)
            .then(response=>{
                console.log(response.data.seller);
                tempHistory[i].seller = response.data.seller.name;
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
        await axios.get("http://localhost:8080/user/"+ tempHistory[i].buyer)
        .then(response=>{
            console.log(response.data.name);
            tempHistory[i].buyerName = response.data.name;
            tempHistory[i].buyerEmail = response.data.email;
        })
    }
    res.status(200).send(tempHistory);
}