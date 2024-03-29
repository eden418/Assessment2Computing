var express = require('express');
var router = express.Router();
var db=require('../database');
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })


// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/user-list', function(req, res, next) {
    var sql='SELECT * FROM Songs';

   
   // db.serialize(() => {
   //     db.each(sql, (err, data) => {
   //       if (err) {
   //         console.error(err.message);
   //       }
   //       console.log(data.Email + "\t" + data.Song);
   //       res.render('user-list', { title: 'Employee List', userData: data});
   //     });
   //   });

   db.all(sql,function(err,data,fields){
    if (err) throw err;
    res.render('user-list', { title: 'User List', userData: data});
   }); 

    /* db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('user-list', { title: 'User List', userData: data});
  }); */

  
   });

   //Erase data
   router.get('/delete/:id', function(req, res, next) {
   var id= req.params.id;
    var sql = 'DELETE FROM Songs WHERE ID = ?';
    db.run(sql, [id], function (err, data) {
    if (err) throw err;
    console.log(" record(s) updated");
  });
  res.redirect('/user/user-list');
  });

  //Edit

  router.get('/edit/:id', function(req, res, next) {
    var UserId= req.params.id;
    var sql=`SELECT * FROM Songs WHERE ID=${UserId}`;
    console.log("****GET***");
    console.log("sql : "+ sql);
    db.all(sql,function(err,data,fields){
        if (err) throw err;
        //res.redirect('/user/editUsers', { title: 'Employee', userData: data[0]});
        res.render('user', { title: 'User List', editData: data[0]});
       });
  });

  router.post('/edit/:id', urlencodedParser, function(req, res, next) {
    var id= req.params.id;
      var updateData=req.body;
    console.log('body is ',req.body);
    console.log('Email body is ',req.body.Email);
    console.log('Song body is ',req.body.Song);
    console.log('ID  ',req);
    var Song = req.body.Song; 
    var Email = req.body.Email;
    var sql = `UPDATE Songs SET ? WHERE ID = ?`;
    var sql = `UPDATE Songs SET Email= '${Email}', Song='${Song}' WHERE  ID= '${id}' `; 
    console.log('Querys : '+sql);
      console.log("****POST***");
      db.run(sql,  function (err, data) {
        if (err) throw err;
        console.log(" record(s) updated");
      });
    res.redirect('/user/user-list');
  });

  
  
  // Insert

  router.get('/Insert' , function(req, res, next) {
    res.render('user');
  });


  
  router.post('/create', urlencodedParser ,function(req, res, next) {
   

    //const userDetails=req.body;
    console.log('body is ',req.body);
    console.log('Email body is ',req.body.Email);
    console.log('Song body is ',req.body.Song);
    var empleo = req.body.Song; 
    var nombre = req.body.Email;

    var sql = `INSERT INTO Songs (Email, Song) VALUES ('${Email}','${Song}') `; 
    console.log('Query : '+sql);
    db.run(sql,  function (err, data) {
        if (err) throw err;
        console.log(" record(s) updated");
      });
    res.redirect('/user/user-list');
  });

module.exports = router;