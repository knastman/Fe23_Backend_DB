//in dev run nodemon with for instant reload
//add requiered library 
//const express =  require('express'); //must be installed with npm
import express from "express";
//const ejs = require('ejs'); //must be installed with npm
import ejs from "ejs";
//const db = require('./db.js'); // Import the database module
import * as db from "./db.js"
//const bodyParser = require('body-parser');//must be installed with npm
import bodyParser from "body-parser";


//create variable representing express
const app = express();

//set public folder for static web pages
app.use(express.static('public'));

//set dynamic web pages, set views and engine
app.set('view engine', 'ejs');

// Set up body parser middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));
// Use body-parser middleware to send JSON data
app.use(bodyParser.json());

////////////////Routing

app.get('/', async (req, res) => {
    //res.send("hello World");//serves index.html
    const pageTitle = "Dynamic webpage";
    const sql = 'SHOW tables';
    const dbData = await db.query(sql);
    console.log(dbData);
    res.render('index', {pageTitle, dbData} );
});
app.get('/exempel', async (req, res) => {
    //res.send("hello World");//serves index.html
    //
    let cols = ["first","second","one","4","c"]
    let buildQuery = (cols) => {
        let colQuery = "";
        for (let i = 0; i < cols.length; i++) {
            if(i<cols.length-1){    
                colQuery+=cols[i]+",";
            }else{
                colQuery+=cols[i]
            }     
        }
        let queryStart = "INSERT INTO(" + colQuery + ") WHERE fdsaf";
        console.log(queryStart);
    }
    buildQuery(cols);

    //
    const pageTitle = "Dynamic webpage";
    const sql = 'SHOW tables';
    const dbData = await db.query(sql);
    console.log(dbData);
    res.render('index', {pageTitle, dbData} );
});

let currentTable;
app.post('/', async (req, res) => {
    //res.send("hello World");//serves index.html
    //getting input data from the form
    console.log(req.body);
    const tableName = req.body;
    const pageTitle = "Dynamic webpage";
    const sql = `SELECT * FROM ${tableName.table_name}`;
    currentTable = tableName.table_name
    const dbData = await db.query(sql);
    console.log(dbData);
    res.render('index', {pageTitle, dbData} );
});



app.get('/removeData', async (req, res) => {
    //res.send("hello World");//serves index.html
    const pageTitle = "Dynamic webpage";
    const sql = `SELECT * FROM ${currentTable}`;
    const dbData = await db.query(sql);
    console.log(dbData);
    res.render('removeData', {pageTitle, dbData} );
});
app.post('/removeData', async (req, res) => {
    //res.send("hello World");//serves index.html
    //getting input data from the form
    console.log(req.body);
    const requestData = req.body;
    const pageTitle = "Dynamic webpage";
    //execute delete query on a table.row
    const sqlDeleteQuery = `DELETE FROM ${currentTable} WHERE id=${requestData.id}`;
    const deleteQuery = await db.query(sqlDeleteQuery);
    console.log(deleteQuery);
    //get table data
    const sql = `SELECT * FROM ${currentTable}`;
    const dbData = await db.query(sql);
    //get table headers
    const sql2 = `DESCRIBE ${currentTable}`;
    const dbDataHeaders = await db.query(sql2);
    console.log(dbDataHeaders);
    //show webpage to the user
    res.render('removeData', {pageTitle, dbData, dbDataHeaders} );
});

//return Json table data
app.get('/students', async (req, res) => {
    let sql = "";
    const {id} = req.query;
    console.log(id);
    if(id){
        sql = `SELECT * FROM students WHERE id = ${id}`;
    }else{
        sql = `SELECT * FROM students`;
    }
    const dbData = await db.query(sql);
    console.log(dbData);
    res.json(dbData);
});

app.get('/plants/:id/:col', async (req, res) => {
    let sql = `SELECT ${req.params.col} FROM plants WHERE id = ${req.params.id}`;
    const dbData = await db.query(sql);
    res.json(dbData);
});



//server configuration
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on  http://localhost:${port}/`);
});