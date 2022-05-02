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
   //       console.log(data.Name + "\t" + data.Job);
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
    console.log('Name body is ',req.body.Name);
    console.log('Job body is ',req.body.Job);
    console.log('ID  ',req);
    var Job = req.body.Job; 
    var Name = req.body.Name;
    var sql = `UPDATE Songs SET ? WHERE ID = ?`;
    var sql = `UPDATE Songs SET Name= '${Name}', Job='${Job}' WHERE  ID= '${id}' `; 
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
    console.log('Name body is ',req.body.Name);
    console.log('Job body is ',req.body.Job);
    var empleo = req.body.Job; 
    var nombre = req.body.Name;

    var sql = `INSERT INTO Songs (Name, Job) VALUES ('${Name}','${Job}') `; 
    console.log('Query : '+sql);
    db.run(sql,  function (err, data) {
        if (err) throw err;
        console.log(" record(s) updated");
      });
    res.redirect('/user/user-list');
  });

module.exports = router;