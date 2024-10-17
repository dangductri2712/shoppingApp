const db = require("../db/mongo.js");
db.connectDb();
const items = db.client.db("shoppingAppDB");

exports.insertHistory = async (req,res)=>{
    console.log(req.body.itemName);
    const historyBody = req.body
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
        const allHistory = await items.collection("history").find({buyer: req.params.email}).toArray(function(err,result){
            if(err) throw err;
            console.log(result);
        });
        console.log("allHistory: "+allHistory);
        res.status(200).send(allHistory);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Can not get the history of this user");
    }
}