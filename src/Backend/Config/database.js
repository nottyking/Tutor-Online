const mysql = require('mysql')

var con = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '030011',
  database : 'tutoronline',
  port : '3306'
})
con.connect(function(err) {
  if (err) throw err;
  console.log("Database connected at 127.0.0.1:3306!");
});
module.exports = con;
