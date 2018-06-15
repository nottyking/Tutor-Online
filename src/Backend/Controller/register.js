const app = require('express')
const router = app.Router();
const con = require('../config/database');

// test connecting this route
// router.use('/',()=>{
//   console.log("In register route: TEST OK!");
// })

// insert data for registering
router.post('/', function(req, res){
  console.log("Enter register");
  con.query("INSERT INTO User (`username`,`password`,email,fname,lname,address,birthday,gender,role) VALUES (?,?,?,?,?,?,?,?,?)",[
    req.body.username,req.body.password,req.body.email,req.body.fname,req.body.lname,req.body.address,req.body.birthday,req.body.gender,'student'
  ],(err, result) => {
    if(err){
      console.log("Error SQL Query in register:",err);
      res.send(err);
    }
    console.log("Result from register inserting:",result);
    res.send(result);
  })
})

module.exports = router ;
