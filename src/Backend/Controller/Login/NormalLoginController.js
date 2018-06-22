const con = require('../../Config/database')
const auth = require('../../Config/Auth')
const jwt = require('jsonwebtoken')

async function LoginByNormal(req, res){
  console.log('Enter login normal');
  console.log(req.body);
  return await new Promise( (resolve, reject) => {
    con.query('SELECT * from user WHERE (username = ? OR email = ?) AND password = ?',[
      req.body.usernameOrEmail, req.body.usernameOrEmail, req.body.password
    ], (err, result) => {
      console.log("ENTER QUERY");
      if(err){
        console.log("Error SQL Query in login:",err);
        resolve({
          result : false ,
          msg : err
        });
      }
      console.log("Result from login common:",result);
      if(result.length === 0){
        console.log("Your Username or Password is Invalid");
        resolve({
          result: false ,
          msg : "Your Username or Password is Invalid"
        })
        return ;
      }

      for(let i = 0 ; i < result.length ; i++){
        if(result[i].isConfirm === 1){
          console.log("Login successful:",result);

          makeAuthentication(result[i].userid, resolve);

          return ;
        }
      }

      console.log("Please confirm your email to login");
      resolve({
        result: false ,
        msg: "Please confirm your email to login"
      });
    })
  })
}

function makeAuthentication(userid, resolve){
  jwt.sign({
      userid: userid
    },
    auth.AUTH_SECRET,{
      expiresIn: auth.MAX_AGE
    },
    (err, loginToken) => {
      if(err){
        resolve({
          result: false,
          msg: err
        });
      }
      resolve({
        result: true ,
        msg: "Login successful",
        loginToken: loginToken
      })
    }
  )
}

module.exports = {
  LoginByNormal : LoginByNormal
}
