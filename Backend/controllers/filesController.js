// const {
//     S3Client, PutObjectCommand, CreateBucketCommand, DeleteObjectCommand
// } = require('@aws-sdk/client-s3');
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
// const s3Client = new S3Client();
const bucketName = 'tri-shopping-items';
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null, file.originalname);
    }
})

const upload = multer({storage: storage});
exports.uploadFile = async (req,res)=>{
    console.log(req.file);
    // const params = {
    //     Bucket: 'tri-shopping-items',
        
    // }
    console.log("Uploading files");
    console.log(req.file);
    res.send("Received file");
}