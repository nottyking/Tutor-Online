const con = require('../../Config/database')
const auth = require('../../Config/Auth')
const jwt = require('jsonwebtoken')
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

async function LoginByNormal(req, res){
  console.log('Enter login normal');
  console.log(req.body);
  return await new Promise( (resolve, reject) => {
    con.query('SELECT * from user WHERE (username = ? OR email = ?) AND password = ?',[
      req.body.usernameOrEmail, req.body.usernameOrEmail, req.body.password
    ], async(err, result) => {
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
          var userid = result[i].userid;

          var loginToken = localStorage.getItem(userid);
          console.log("Login token in storage:",loginToken);
          if(loginToken!=null){
            console.log("There is this user in server");
            return resolve({
              result: true ,
              msg: "Login successful",
              loginToken: loginToken
            }) ;
          }

          var loginToken = (await makeAuthentication(userid));
          console.log("Login Token:",loginToken);
          storeThisIDInLocalStorage(userid, loginToken);

          return resolve({
            result: true ,
            msg: "Login successful",
            loginToken: loginToken
          }) ;

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

async function makeAuthentication(userid){
  console.log("makeAuthentication with JWT");
  return new Promise((resolve, reject) => {
    jwt.sign({
      userid: userid
    },
    auth.AUTH_SECRET,{
      expiresIn: auth.MAX_AGE
    },
    (err, loginToken) => {
      if(err){
        console.log("JWT ERR:",err);
      }
      console.log("Get logintoken:",loginToken);
      resolve (loginToken);
    })
  })
}

function storeThisIDInLocalStorage(userid, loginToken){
  console.log("storeThisIDInLocalStorage");
  localStorage.setItem(userid, loginToken);
}

module.exports = {
  LoginByNormal : LoginByNormal
}
