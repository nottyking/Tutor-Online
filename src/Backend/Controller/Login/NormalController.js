function LoginByNormal(req, res){
  console.log('Enter login normal');
  con.query('SELECT * from user WHERE (username = ? OR email = ?) AND password = ?',[
    req.body.username, req.body.username, req.body.password
  ], (err, result) => {
    if(err){
      console.log("Error SQL Query in login:",err);
      return({
        result : false ,
        msg : err
      });
    }
    console.log("Result from login common:",result);
    if(result.length === 0){
      console.log("Your Username or Password is Invalid");
      res.send({
        result: false ,
        msg : "Your Username or Password is Invalid"
      })
    }
    for(let i = 0 ; i < result.length ; i++){
      if(result[i].isConfirm === 1){
        console.log("Login successful:",result);
        res.send({
          result: true ,
          msg: "Login successful"
        })
      }
    }
    console.log("Please confirm your email to login");
    res.send({
      result: false ,
      msg: "Please confirm your email to login"
    });
  })
})
