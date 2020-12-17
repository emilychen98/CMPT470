const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql');
const session = require('express-session');
const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');

app = express(),

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Serve static files
var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: "login.html"
}

app.use('/', express.static('./pub_html', options));

//=============================================================================================================
// Database Connection 
//=============================================================================================================
 
// Create connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3307,
    user : 'root',
    password: 'root',
    database: 'cmpt470'
});
  
// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("Database connected...")
})

//=============================================================================================================
// Miscellaneous Routes
//=============================================================================================================

app.get('/createUsersTable', (req, res) => {
    let sql = 'CREATE TABLE users (' +
                    'username VARCHAR(25),' + 
                    'password VARCHAR(100),' +
                    'salt VARCHAR(100),' + 
                    'PRIMARY KEY(username))';
    db.query(sql, (err,result) => {
        if(err) throw err;
    })
    res.send("User table created");
})

app.get('/addUser/:username/:password', (req, res) => {
    let username = req.params.username;
    let salt = uuidv4();
    let password = md5(req.params.password + salt);
    let user = {username, password, salt};
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, user, (err, result) => {
        if(err) {
            return false;
        }
    })
    res.send("User Added")
})

app.get('/droptable', (req, res) => {
    let sql = 'DROP TABLE users';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
    })
    return
})

//=============================================================================================================
// Authentication
//=============================================================================================================

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
    let sql = `SELECT * FROM users WHERE username='${req.session.user}'`
    db.query(sql, (err, result) => {
        if(err) throw err;
        if (result != "") {
            return next();
        } else {
            return res.sendStatus(401);
        }
    })
};
 
// Login endpoint
app.post('/login', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.send("login failed");
    } else {
        // Check against database
        let sql = `SELECT * FROM users WHERE username='${req.body.username}'`
        db.query(sql, (err, result) => {
            if(err) throw err;
            var salt = result[0].salt;
            sql = `SELECT 1 FROM users WHERE username='${req.body.username}' AND password='${md5(req.body.password + salt)}'`
            db.query(sql, (err, result) => {
                if(err) throw err;
                if (result != "") {
                    req.session.user = req.body.username;
                    // res.send("login success!");
                    res.redirect('/content');
                } else {
                    res.send("login failed");
                }
            })
        })
    }
});
 
// Logout endpoint
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/login');
});
 
// Get content endpoint
app.get('/content', auth, function (req, res) {
    // res.send("You can only see this after you've logged in.");

    let sql = `SELECT * FROM users`
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
});
 
app.listen(3000);
console.log("app running at http://localhost:3000");
