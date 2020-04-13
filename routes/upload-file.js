var express = require('express');
var router = express.Router();
var path = require('path');
var uploadModel = require('../modules/upload');
var imageData = uploadModel.find({});
var multer = require('multer');


router.use(express.static(__dirname+ "./public/"));


if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
var Storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({
  storage: Storage
}).single('file');



/* GET home page. */
 router.post('/upload',upload,  function (req, res, next) {

 var success = req.file.filename + " uploaded successfully";
   var imageFile = req.file.filename;
var imageDetails = new uploadModel({
    imagename: imageFile
   });
   //uploaded in db

   imageDetails.save(function (err, doc) {
     if (err) throw err;

     //display uploaded file in UI

     imageData.exec(function (err, data) {
      if (err) throw err;
      res.render('upload-file', { title: 'Upload File', records:data, success: success });
    });
   });
 });


/* GET home page. */
 router.get('/upload', function (req, res, next) {

  //display uploaded file in UI
 imageData.exec(function (err, data) {
   if (err) throw err;
 
  res.render('upload-file', { title: 'Upload File', records:data, success: '' });


});
 });



module.exports = router;
