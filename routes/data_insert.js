var express = require('express');
var router = express.Router();
var mysql = require('mysql');
let alert = require('alert'); 
let toastify = require('toastify-js');
 



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('data_insert', { title: 'Express' });
});
router.post('/',function(req,res,next){
 
        function clear(){
          req.body.fname.value ="";
          req.body.phone.value = "";
        }  
  const phoneNumber = req.body.phone;
  const name = req.body.fname;
  if(name.length == 0)
  {
    alert('please enter the name')
  }
  if(phoneNumber.length != 12 )
  {
    alert('enter a valid phone number with country code')
  }    
  else{  
    var checkSql = 'SELECT COUNT(*) AS count FROM recipients WHERE recipient_phone = "'+req.body.phone+'"';
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
    con.query(checkSql,[phoneNumber],function(err,result){
      if(err){
        console.log(err);
        res.status(500).render('error',{message:"Database error"});
        return;
      }
      if(result[0].count>0){
        alert('Phone number already exists in the database.');
      }
      else
      {
        var sql = 'insert into recipients values("'+req.session.userid+'","'+req.body.fname+'","'+req.body.phone+'");';
        con.query(sql,function(err,result){
          if (err) {
            console.log(err)
          }
          else{
            alert('Successfully added')
          
          }
          con.end(); 
        });
    
      }

    });    
  });
  }

});

module.exports = router;
