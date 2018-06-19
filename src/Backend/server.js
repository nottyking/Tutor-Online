const express = require('express');
const cors = require('cors');
const http = require('http');
const mysql = require('mysql')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

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
