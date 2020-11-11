const mysql = require('mysql');
var db = require('../routes/database');

var rectangleModel = {
    createRectangleTable: function(){
        let sql = 'CREATE TABLE rectangle (' +
                    'id INT AUTO_INCREMENT,' + 
                    'width INT,' + 
                    'height INT,' +
                    'color VARCHAR(25),' +
                    'bordercolor VARCHAR(25),' +
                    'opacity FLOAT(5,2),' + 
                    'pattern VARCHAR(25),' +
                    'PRIMARY KEY(id))';
        let query = db.query(sql, (err,result) => {
            if(err) throw err;
        })
        return
    },
    dropRectangleTable: function(){
        let sql = 'DROP TABLE rectangle';
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
        })
        return
    },
    addRectangle: function(width, height, color, bordercolor, opacity, pattern){
        let rectangle = {width, height, color, bordercolor, opacity, pattern};
        let sql = 'INSERT INTO rectangle SET ?';
        let query = db.query(sql, rectangle, (err, result) => {
            if(err) throw err;
            // console.log(result);
        })
        return
    },
    getRectangles: function(cb){
        let sql = 'SELECT * FROM rectangle';
        let query = db.query(sql, (err, results) => {
            if(err) throw err;
            return cb(results);
        })
    },
    getRectangle: function(id){
        let sql = `SELECT * FROM rectangle WHERE id = ${id}`;
        let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        })
        return
    },
    updateRectangle: function(id, width, height, color, bordercolor, opacity, pattern){
        let sql = `UPDATE rectangle SET width = '${width}', height = '${height}', color = '${color}', bordercolor = '${bordercolor}', opacity = '${opacity}', pattern = '${pattern}' WHERE id = '${id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
        })
    },
    deleteRectangle: function(id){
        let sql = `DELETE FROM rectangle WHERE id = ${id}`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
        })
        return
    },  
    deleteAllRectangles: function(){
        let sql = "DELETE FROM rectangle";
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
        })
        return
    }
}
  
module.exports = rectangleModel;
