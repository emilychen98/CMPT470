var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var db = require('./database');

var rectangleModel = require('../model/rectangles');

router.get('/', (req, res) => {
    // Render view with all rectangles
    rectangleModel.getRectangles((result) => {
        // Note: if you want to see what is the result as a string insteand of [object object],
        // call JSON.stringify(result);
        res.render('index', {rectangles: result}); // send array of objects to client
    });
})

// Create Database
router.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE cmpt470';
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send("Database created...");
    }); 
})

// Create Table for Rectangles
router.get('/createRectangleTable', (req, res) => {
    rectangleModel.createRectangleTable();
    res.send("Rectangle table created...");
})

// Drop Table for Rectangle
router.get('/dropRectangleTable', (req, res) => {
    rectangleModel.dropRectangleTable();
})

// Add Rectangle
router.post('/addRectangle', (req,res) => {
    let width = req.body.width;
    let height = req.body.height;
    let color = req.body.fill;    
    let bordercolor = req.body.border;
    let opacity = req.body.opacity;
    let pattern = req.body.pattern;

    var rectangle = rectangleModel.addRectangle(width, height, color, bordercolor, opacity, pattern);
    res.redirect('/'); // redirect to home page to render view
})
  
// Select All Rectangles
router.get('/getRectangles', (req,res) => {
    var rectangles = rectangleModel.getRectangles();
    res.send("Rectangles returned...");
})

// Select A Rectangle
router.get('/getRectangle/:id', (req,res) => {
    var rectangle = rectangleModel.getRectangle(`${req.params.id}`);
})

// Update A Rectangle
router.post('/updateRectangle', (req,res) => {
    let id = req.body.id;
    let width = req.body.width;
    let height = req.body.height;
    let color = req.body.color;    
    let bordercolor = req.body.bordercolor;
    let opacity = req.body.opacity;
    let pattern = req.body.pattern;

    var rectangle = rectangleModel.updateRectangle(id, width, height, color, bordercolor, opacity, pattern);
    res.redirect('/');
})

// Delete A Rectangle
router.post('/deleteRectangle', (req,res) => {
    console.log("ID: " + req.body.id);
    var rectangle = rectangleModel.deleteRectangle(`${req.body.id}`);
    res.redirect('/');
})

// Delete all Rectangles
router.post('/deleteAllRectangles', (req,res) => {
    var rectangle = rectangleModel.deleteAllRectangles();
    res.redirect('/');
})

module.exports = router;
