var express = require('express');
var router = express.Router();
var mysql = require('mysql');
let alert = require('alert'); 

var https = require('follow-redirects').https;
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = 'select * from recipients where userid ="' +     req.session.userid + '"';
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "alertsystem"
  });
  con.connect(function(error) {
    if (error) {
      console.error("Error connecting to database:", error);
      res.status(500).render('error', { message: "Database connection error" });
      return;
    }
    
    console.log("Connected!");
    
    con.query(sql,function(err,result){
      if (err) {
        console.log(err)
      }
      else{
        res.render('message_box',{'err' : '', recipients : result})
      
      }
      con.end(); 
      });
  });
});
router.post('/', function(req, res, next){
  const phoneNumber = req.body.recptname;
  const message = req.body.message;
  

  var sql = 'insert into messages (user_id,message) values("'+ req.session.userid +'","'+  req.body.message +'");';
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "alertsystem"
  });

  con.connect(function(error) {
    if (error) {
      console.error("Error connecting to database:", error);
      res.status(500).render('error', { message: "Database connection error" });
      return;
    }
    
    console.log("Connected!");
    
    con.query(sql,function(err,result){
      if (err) {
        console.log(err)
      }
      console.log("successfully added into message table");
      console.log("the message id is :" +result.insertId);
      var messageId = result.insertId;
      
     
        con.end(); 
      
     });

  });
  if (phoneNumber && message)
  
  {
  console.log(req.body.recptname);
   var options = {
     'method': 'POST',
    
     'hostname': 'us.sms.api.sinch.com',
     'path': '/xms/v1/d225dd8387d94c9d8fc48d6afdf02469/batches',
     'headers': {
         'Authorization': 'Bearer 9ad16919e7e3488cb49bec2541681f28',
         'Content-Type': 'application/json',
         'Accept': 'application/json'
     },
     'maxRedirects': 20
   };

   var req = https.request(options, function (res) {
       var chunks = [];

       res.on("data", function (chunk) {
          chunks.push(chunk);
       });

       res.on("end", function (chunk) {
           var body = Buffer.concat(chunks);
           console.log(body.toString());
       });

       res.on("error", function (error) {
           console.error(error);
    });
   });

var postData = JSON.stringify({
    "from": "447520651342",
     "to": 
      phoneNumber,
     
     "body": message
   });
   console.log(postData);

   req.write(postData);

   req.end();
  
res.redirect('/acknowledgement');
}
else
{
  alert('Fields cannot be empty')
}
});



module.exports = router;