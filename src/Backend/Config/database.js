const mysql = require('mysql')

var con = mysql.createConnection({
  host     : '35.240.135.236',
  user     : 'root',
  password : 'playtorium',
  database : 'tutoronline',
  port : '3306',
  charset : 'utf8mb4'
})
con.connect(function(err) {
  if (err) throw err;
  console.log("Database connected at 35.240.135.236:3306!");
});
module.exports = con;
