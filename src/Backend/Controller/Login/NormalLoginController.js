const con = require('../../Config/database')

async function LoginByNormal(req){
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
      }

      for(let i = 0 ; i < result.length ; i++){
        if(result[i].isConfirm === 1){
          console.log("Login successful:",result);
          resolve({
            result: true ,
            msg: "Login successful"
          })
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

module.exports = {
  LoginByNormal : LoginByNormal
}
