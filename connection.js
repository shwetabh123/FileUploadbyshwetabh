
// exports.connectionString='mongodb://localhost:27017/address';

var env=process.env.NODE_ENV || 'dev';
var con ='';


if(env==='dev')

{

    con='mongodb+srv://test:test@address-kvpmm.mongodb.net/test/address';


// con='mongodb://localhost:27017/address';


}

else if (env==='production'){

   con='mongodb+srv://test:test@address-kvpmm.mongodb.net/test/address';

 //   con='mongodb://localhost:27017/address';


}

console.log(con);

console.log(env);
exports.connectionString=con;
