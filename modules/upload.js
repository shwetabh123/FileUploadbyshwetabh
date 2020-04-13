const mongoose = require('mongoose');
//localhost
//mongoose.connect('mongodb://localhost:27017/imagespath', {useNewUrlParser: true});
//server

 mongoose.connect("mongodb+srv://test:test@address-kvpmm.mongodb.net/test?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log("connected to db"));

var conn =mongoose.Collection;

var uploadSchema =new mongoose.Schema({
	imagename: String,

});

//var uploadModel = mongoose.model('files', uploadSchema);

var uploadModel = mongoose.model('image', uploadSchema);
module.exports=uploadModel;