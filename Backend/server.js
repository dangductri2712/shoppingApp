const express  = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
var corsOptions = {
    origin: "http://localhost:3000"
}


app.use(cors(corsOptions));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// const {connectDb} = require("./db/mongo.js");
const routes = require('./router/api-router.js');
// require("./backend-app/src/router/api-router.js")(app);
app.use('/', routes);
app.use(express.static('./images'))
const PORT = 8080;
// app.get("/", (req,res)=> {
//     console.log("Welcome to Danny's shopping app");
// })

// connectDb();   //connecting with the mongoDB

app.listen(PORT, (err)=> {
    if(err){
        console.log("Error with listening in backend");
    }
    else{
        console.log(`Server is running on port 8080`);
    }
})

