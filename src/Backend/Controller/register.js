var app = require('express')
var router = app.Router();
var con = require('../Config/database');

// router.use('/',()=>{
//   console.log(con);
// })

router.get('/', async function(req, res){
  console.log("Entering");
  try{
    var sql = "SELECT * FROM user";
    // var t = await con.query(sql);
    // console.log(t);
    // res.send(t);
    con.query(sql,(err, result, field) => {
      // console.log("123");
      console.log(result);
      res.send(result);
    })
  }catch(err){
    console.log('ERROR',err);
  }
})

module.exports = router ;
