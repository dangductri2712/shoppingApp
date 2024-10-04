const db = require("../db/mongo.js");
db.connectDb();
const items = db.client.db("shoppingAppDB");

exports.insertHistory = async (req,res)=>{
    console.log(req.body.itemName);
    const historyBody = {
        itemName: req.body.itemName,
        seller: req.body.sellerID,
        buyer: req.body.buyerID,
        price: req.body.price
    }
    await items.collection("history").insertOne(historyBody)
    .then(res=>{
        console.log("Successfully save the history");
    })
    .catch(err=>{
        console.log("There is an issue saving the history");
    })
}

exports.viewHistory = async(req,res)=>{
    console.log("Viewing history");
    try{
        const allHistory = await items.collection("history").find({uid: req.params.uid}).toArray(function(err,result){
            if(err) throw err;
            console.log(result);
        });
        res.status(200).send(allHistory);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Can not get the history of this user");
    }
}