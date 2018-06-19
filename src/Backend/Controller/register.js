const app = require('express')
const router = app.Router();
const con = require('../config/database');

// test connecting this route
// router.use('/',()=>{
//   console.log("In register route: TEST OK!");
// })

function checkSameUsernameInDB(username, resolve){
  console.log('Enter register checkUsername');
  con.query('SELECT * from user WHERE username = ?',[ username ], (err, result) => {
    if(err){
      console.log("Error SQL Query in register checkUsername:",err);
      resolve({
        result : true ,
        msg : err
      });
    }
    console.log("Result from register checkUsername:",result);
    if(result.length === 0){
      resolve({
        result : false ,
        msg : "Username OK"
      })
    }
    else if(result.length === 1){
      console.log("IN 1");
      resolve({
        result : true ,
        msg : "This E-mail has been used"
      })
    }
    else{
      resolve({
        result : true ,
        msg : "ERROR!: This username is many in database."
      });
    }
  })
}

function checkSameEmailInDB(email, resolve){
  console.log('Enter register checkEmail');
  con.query('SELECT * from user WHERE email = ?',[ email ], (err, result) => {
    if(err){
      console.log("Error SQL Query in register checkEmail:",err);
      resolve({
        result : true ,
        msg : err
      });
    }
    console.log("Result from register checkEmail:",result);
    if(result.length === 0){
      resolve({
        result : false ,
        msg : "This email is available"
      })
    }
    else if(result.length === 1){
      resolve({
        result : true ,
        msg : "This username has been used"
      })
    }
    else{
      resolve({
        result : true ,
        msg : "ERROR!: This email is many in database."
      });
    }
  })
}

router.post('/checkUsernameAndEmail', async (req, res) => {
  console.log('Enter checkUsernameAndEmail', req.body);
  var isSameUsernameInDB = (await new Promise ((resolve, reject) => {
    checkSameUsernameInDB(req.body.username, resolve)
  }))
  var isSameEmailInDB = (await new Promise ((resolve, reject) => {
    checkSameEmailInDB(req.body.email, resolve)
  }))
  console.log("isSameUsername :",isSameUsernameInDB);
  console.log("isSameEmail :",isSameEmailInDB);
  res.send({
      isSameUsernameInDB : isSameUsernameInDB ,
      isSameEmailInDB : isSameEmailInDB
  })
})

// insert role as student or admin table if reject, delete user table row
function insertRole(role,result,res){
  var id = result.insertId;
  con.query("INSERT INTO " + role + " (userid) VALUES (?)", [ id ],(err, result) => {
    if(err){
      console.log("Error SQL Query " + role + " insert in register:",err);
      con.query("DELETE FROM user WHERE userid=?", [ id ], (err, result) => {
        if(err){
          console.log("Error SQL Query user deletion in register:",err);
          res.send(err);
        }
        res.send("unsuccess");
      });
    }
    console.log("Register SUCCESS,Result from register inserting:",result);
    res.send(result);
  })
}

// insert user table and then insert role as student or admin table
function insertUserAndRole(role,req,res){
  console.log("Enter " + role + " register insertion");
  con.query("INSERT INTO user (username,password,email,fname,lname,address,birthday,gender) VALUES (?,?,?,?,?,?,?,?)",[
    req.body.username,req.body.password,req.body.email,req.body.fname,req.body.lname,req.body.address,req.body.birthday,req.body.gender
  ],(err, result) => {
    if(err){
      console.log("Error SQL Query user insert in register:",err);
      res.send(err);
    }
    console.log("Result from register inserting:",result);
    console.log('Then, insert ' + role + ' table');
    insertRole(role,result,res);
  })
}

// insert student data for registering
router.post('/student', function(req, res){
  insertUserAndRole('student',req,res);
})

// insert admin data for registering
router.post('/admin', function(req, res){
  insertUserAndRole('admin',req,res);
})

module.exports = router ;
