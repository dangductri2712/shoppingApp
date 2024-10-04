const {MongoClient} = require('mongodb');
require('dotenv').config();
const uri = `${process.env.MONGODBURI}`;
const client = new MongoClient(uri);
const connectDb = async()=>{
    try{
        await client.connect();

        // await listDatabases(client);
    }
    catch(e){
        console.error(e);
    }
    // finally{
    //     await client.close();
    // }
    
}
async function listDatabases(client){
    var databasesList = await client.db().admin().listDatabases();

    console.log("Databases: ");
    databasesList.databases.forEach(db=> console.log(`-${db.name}`));
}

module.exports=  {connectDb, client};