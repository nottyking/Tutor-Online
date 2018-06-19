const con = require('../../Config/database');

// main function: caller check username and email function
async function checkIsSameUsernameAndEmail(req, res){

  console.log('Enter checkUsernameAndEmail', req.body);
  /* Check same username with database*/
  var isSameUsernameInDB = (await new Promise ((resolve, reject) => {
    checkSameUsernameInDB(req.body.username, resolve)
  }))
  /* Check same email with database*/
  var isSameEmailInDB = (await new Promise ((resolve, reject) => {
    checkSameEmailInDB(req.body.email, resolve)
  }))
  console.log("isSameUsername :",isSameUsernameInDB);
  console.log("isSameEmail :",isSameEmailInDB);

  return({
      isSameUsernameInDB : isSameUsernameInDB ,
      isSameEmailInDB : isSameEmailInDB
  })
}

// callee function: check username function
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

// callee function: check email function
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

module.exports = {checkIsSameUsernameAndEmail: checkIsSameUsernameAndEmail};
