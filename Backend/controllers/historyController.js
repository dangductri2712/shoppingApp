const axios  = require('axios');
const db = require("../db/mongo.js");
db.connectDb();
const items = db.client.db("shoppingAppDB");

exports.insertHistory = async (req,res)=>{
    console.log("storing history of purchase");
    console.log(req.body);
    const historyBody = req.body;
    await items.collection("history").insertMany(historyBody)
    .then(res=>{
        console.log("Successfully save the history");
    })
    .catch(err=>{
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