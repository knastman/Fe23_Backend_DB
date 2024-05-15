//in dev run nodemon with for instant reload
//add requiered library 
const express = require('express'); //must be installed with npm
const ejs = require('ejs'); //must be installed with npm
const db = require('./db.js'); // Import the database module
const bodyParser = require('body-parser');//must be installed with npm

//create variable representing express
const app = express();

//set public folder for static web pages
app.use(express.static('../public/style/style.css'));

//set dynamic web pages, set views and engine
app.set('view engine', 'ejs');

// Set up body parser middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

////////////////Routing

app.get('/', async (req, res) => {
    //res.send("hello World");//serves index.html
    const pageTitle = "Dynamic webpage";
    const sql = 'SELECT * FROM students';
    const dbData = await db.query(sql);
    console.log(dbData);
    res.render('index', {pageTitle, dbData} );
});

app.post('/', async (req, res) => {
    //res.send("hello World");//serves index.html
    //getting input data from the form
    console.log(req.body);
    const tableName = req.body;

    const pageTitle = "Dynamic webpage";

    const sql = `SELECT * FROM ${tableName.table_name}`;
    const dbData = await db.query(sql);
    console.log(dbData);
    const sql2 = `DESCRIBE ${tableName.table_name}`;
    const dbDataHeaders = await db.query(sql2);
    console.log(dbDataHeaders);
    res.render('index', {pageTitle, dbData, dbDataHeaders} );
});




//server configuration
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on  http://localhost:${port}/`);
});