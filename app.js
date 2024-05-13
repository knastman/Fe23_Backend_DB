//in dev run nodemon with for instant reload
//add requiered library 
const express = require('express'); //must be installed with npm
const ejs = require('ejs'); //must be installed with npm
const db = require('./db.js'); // Import the database module
const bodyParser = require('body-parser');//must be installed with npm

//create variable representing express
const app = express();

//set public folder for static web pages
//app.use(express.static('public'));

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

app.post('/submit', async (req, res) => {
    try {
      console.log(req.body);
      //const {plant1, plant2} = req.body;
        // Example query to fetch users from 'users' table
        const sql = 'SELECT * FROM plants';
        const plants = await db.query(sql);
        console.log(plants);
        res.render('dbList',{plants});
        //res.json(plants); // Return fetched data as JSON response
       //res.render('dbList', {plants});
      } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
      }
});



//server configuration
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on  http://localhost:${port}/`);
});