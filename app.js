const bodyParser = require('body-parser');
const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const favicon = require('serve-favicon');
const path = require('path');

//Adding dotenv to use environment variables
require('dotenv').config();

//create express app
const app = express();
const port = 3000;
//parsing middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());
//static files
app.use(express.static('public'));
//serve favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//template engine
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');
//connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});
//connect to database
pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log('Connected as ID ' + connection.threadId);
});
const routes = require('./server/routes/user');
app.use('/', routes);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


