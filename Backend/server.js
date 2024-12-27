const express  = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const multer = require("multer");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
// const s3Client = new S3Client();
const bucketName = 'tri-shopping-items';
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
const storage = multer.diskStorage({
    destination: function(req,file, callback){
        callback(null, "./images");
    },
    filename: function(req,file, callback){
        callback(null, file.originalname);
    }
})
const upload = multer({storage: storage});
app.post('/upload', upload.single('uploadFile'), (req,res)=>{
    console.log("req.file: "+req.file.name);
    const params = {
        Bucket: 'tri-shopping-items',
        Key: req.file.name,
        Body: req.file
    }
    s3.upload(params, (err, data)=>{
        if(err){
            console.log("Error uploading files"+err);
        }
        else{
            console.log("File uploaded successfully");
            res.status(201).send("File uploaded successfully");
        }
    })
    // console.log("Uploading file");
    // console.log(req.file);
    // res.status(201).send("Successfully upload file"); 

})
app.listen(PORT, (err)=> {
    if(err){
        console.log("Error with listening in backend");
    }
    else{
        console.log(`Server is running on port 8080`);
    }
})

