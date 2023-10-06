var session = require("express-session");
var express = require('express');
var router = express.Router();
var mysql = require('mysql');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/',function(req,res,next){
  var sql = 'select * from users where username = "' +req.body.username+ '" and password = "' +req.body.password+ '"';
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
    
    con.query(sql, function (err, result) {
       // Close the connection first

      if (err) {
        console.error("Error executing query:", err);
        res.status(500).render('error', { message: "Database query error" });
        return;
      }

      if (result.length === 1) {
        console.log(result[0]);
        req.session.username = result[0]["username"];
        req.session.userid = result[0]["userid"];
        req.session.save();
        console.log(req.session.username);
        console.log(req.session.userid);
        res.redirect('/message_box');
      } else {
        res.render('login', {'err': 'Invalid username or password'})
      }
      con.end();
    });
  });
});

module.exports = router;