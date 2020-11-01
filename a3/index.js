import express from "express";
import mysql from 'mysql';

var app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.json({
        message: 'Hello World from the backend server on the "/" route!',
    });
});
  
app.listen(port, () => {
    console.log(`Backend server listening on port ${port}`);
});
  