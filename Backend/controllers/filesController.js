const multer = require('multer');
const fs = require('fs');
const path = require('path');
const imageFolder = path.join('./', "images")
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'images');
    }
    , 
    fileName: (req, file, cb)=>{
        const {originalname} = file;
        cb(null, originalname);   //null is meant for error
    }
})
// const upload = multer({storage: storage});
const upload = multer({dest: '../images'});
exports.uploadFile = async (req,res)=>{
    console.log("Uploading files");
    // const {imageFile} = req.files;
    // console.log("uploading file");
    // try{
    //     // upload.single('imageFile');
    //     imageFile.mv(path.join(imageFolder, imageFile.name));
    //     res.status(201).send("Receive uploaded file");
    // }
    // catch(err){
    //     console.log(err);
    // }
    
    res.send("Received file");
}