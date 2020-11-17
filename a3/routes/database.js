const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host: '10.128.0.4',
    port: 3306,
    user : 'TESTUSER',
    password: 'TESTUSER',
    database: 'cmpt470'
});
  
// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("Database connected...")
})
  
module.exports = db;
