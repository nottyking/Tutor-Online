const app = require('express')
const con = require('../../Config/database');

// insert data for registering from role received
function registerAsRole(role, req, res){
  return insertUserAndRole(role, req, res)
}

// insert role as student or admin table if reject, delete user table row
function insertRole(role,result,res){
  var id = result.insertId;
  con.query("INSERT INTO " + role + " (userid) VALUES (?)", [ id ],(err, result) => {
    if(err){
      console.log("Error SQL Query " + role + " insert in register:",err);
      con.query("DELETE FROM user WHERE userid=?", [ id ], (err, result) => {
        if(err){
          console.log("Error SQL Query user deletion in register:",err);
          return({
            result : false ,
            msg : err
          });
        }
        return({
          result : false ,
          msg : "Unsuccess, please try again."
        });
      });
    }
    console.log("Register SUCCESS,Result from register inserting:",result);
    return({
      result : true ,
      msg : "Success!"
    });
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
      return({
        result : false ,
        msg : err
      });
    }
    console.log("Result from register inserting:",result);
    console.log('Then, insert ' + role + ' table');
    return insertRole(role,result,res);
  })
}

module.exports = {registerAsRole: registerAsRole} ;
