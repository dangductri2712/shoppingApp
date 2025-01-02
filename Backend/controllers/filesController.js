const {google} = require('googleapis');
const createReadStream = require('fs').createReadStream;
// const pkey = require('./shoppingApp-pk.json');
const SCOPES = ["https://www.google.apis.com/auth/drive"];
const AWS = require("aws-sdk");
const { env } = require('process');
const s3 = new AWS.S3();

const CLIENT_ID = env.CLIENT_ID;
const REFRESH_TOKEN=env.GOOGLE_REFRESH_TOKEN
const CLIENT_SECRET = env.CLIENT_SECRET
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
const drive = google.drive({version: 'v3', auth: oauth2Client});

const multer = require('multer');
const { runInNewContext } = require('vm');
// const fs = require('fs');
const path = require('path');


/**
 * Main function to upload file to google drive
 * @param {*} req : The incoming request from frontend
 * @param {*} res : The response from backend
 */
exports.uploadFile = async (req,res)=>{
    var imagePath = '';
    console.log("Sending file to drive");
    try{
        var fileMetaData = {
            name: "",
            parents: [env.DRIVE_FOLDER_ID]
        }
        var fileName = '';
        const storage = multer.diskStorage({
            destination: (req,file,cb)=>{
                cb(null, './images/')
            },
            filename: function(req, file, callback){
                callback(null, file.originalname);
                fileName = file.originalname
            }
        })
        var response = '';
        var reqFileReader = multer({storage: storage}).array('uploadFile', 9000);  //There are two input with file types. One for selling and one for editing as well.
        var chosenFile = '';
        await reqFileReader(req,res, async(err)=>{
            if(err){
                console.log(err);
                res.status(400).send("File is not received on multer part");
            }
            else{
                chosenFile = req.files[0];
                fileName = String(chosenFile.originalname);
                console.log(chosenFile);
                response  = await drive.files.create({
                    requestBody:{
                        name: fileName,
                        mimeType: chosenFile.mimetype
                    },
            
                    resource: fileMetaData,
                    media:{
                        body: createReadStream(String(chosenFile.path)),
                        // body: chosenFile.buffer,
                        mimeType: chosenFile.mimetype
                    },
                    fields: 'id',
                });
                console.log("response: "+response.data.id);
                res.status(200).send({imageURI: "https://drive.google.com/thumbnail?id="+response.data.id});
                
            }
           
        })
        
    }
    catch(err){
        console.log(err.message);
    }
}
  
