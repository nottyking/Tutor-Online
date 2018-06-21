const express = require('express');
const cors = require('cors');
const http = require('http');
const mysql = require('mysql')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

const auth = require('./Config/Auth')
const ipList = require('../Config/ipConfig')
const jwt = require('jsonwebtoken')
app.use(function(req, res, next){
  console.log("CHECK AUTH IN SERVER");
  const clientLoginToken = req.body.loginToken;
  if(req.body.loginToken){
    const { userid: userid } = jwt.verify(req.body.loginToken, auth.AUTH_SECRET);
    console.log("userid:",userid);
    if(!userid){
      return res.redirect(ipList.frontend);
    }
    else{
      req.session.userid = userid ;
      res.send({Find:userid});
      console.log('session userid:',req.session.userid);
      jwt.sign({
          userid: userid
        },
        auth.AUTH_SECRET,{
          expiresIn: auth.MAX_AGE
        }
      )
    }
  }
  next();
})

// All route is in routerList file
const routerList = require('./routerList');
for(var i = 0 ; i < routerList.path.length ; i++){
  var nowPath = routerList.path[i];
  var nowRouteTo = routerList.routeTo[i];
  app.use(nowPath, nowRouteTo);
}

const server = http.createServer(app);

app.listen(8888, () => {
  console.log('Start server at port 8888.');
})
