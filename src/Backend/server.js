const express = require('express');
const cors = require('cors');
const http = require('http');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
// const con = require('./Config/database')

var con = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'tutoronline',
  port : '3306'
})
con.connect(function(err) {
  if (err) throw err;
  console.log("Database connected at 127.0.0.1:3306!");
});

// var checkAuthentificate = require('./controller/checkAuthentificate');
var registerController = require('./controller/register');
//
app.use('/register', registerController);
// app.use('/student' , studentController);

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.bodyParser());

const server = http.createServer(app);

app.listen(8888, () => {
  console.log('Start server at port 8888.');
})
