const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password: '',
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