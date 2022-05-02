const sqlite3 = require('sqlite3').verbose();

// Create the object to the database.
let db = new sqlite3.Database('DBEmployees.db' , (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database');
});

/* var conn = SQL.connect( { Driver: "SQLite",
Database: "C:\\x\\Database\\GAC017Unit5PartF\\myapp\\DBEmployees.db"} );

conn.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
  }); */

module.exports=db;