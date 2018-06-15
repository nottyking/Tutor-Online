const app = require('express')
const router = app.Router();
const con = require('../config/database');

// router.use('/',()=>{
//   console.log(con);
// })

// insert data for registering
router.get('/', async function(req, res){
  console.log("Enter");
  var username = res.body.username ;
  var password = res.body.password ;
  var fname = res.body.fname ;
  var lname = res.body.lname ;
  var email = res.body.email ;
  var birthday = res.body.birthday ;
  var gender = res.body.gerder ;

  var sql = "INSERT () FROM user";
  con.query(sql,(err, result, field) => {
    if(err){
      console.log("Error SQL Query in register:",err);
      res.send(err);
    }
    console.log("Result from register inserting:",result);
    res.send(result);
  })
})

module.exports = router ;
