const express = require('express');
const cors = require('cors');
const http = require('http');
const mysql = require('mysql')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const fileUpload = require('express-fileupload');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(fileUpload())

app.use(session({
  secret: 'TUTORSESSION',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}))

const Auth = require('./Auth')
app.use(async (req,res,next) => {
  await Auth.checkAuthen(req,res,next)
})

// const io = require('./Config/socket');

// All route is in routerList file
const routerList = require('./routerList');
for(var i = 0 ; i < routerList.path.length ; i++){
  var nowPath = routerList.path[i];
  var nowRouteTo = routerList.routeTo[i];
  app.use(nowPath, nowRouteTo);
}

app.listen(8888, () => {
  console.log('Start server at port 8888.');
})
