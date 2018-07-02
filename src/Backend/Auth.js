const auth = require('./Config/Auth')
const ipList = require('../Config/ipConfig')
const jwt = require('jsonwebtoken')

function checkAuthen(req, res, next){
  console.log("CHECK AUTH IN SERVER");
  console.log("SESSION USERID:",req.session.userid);
  console.log("FILES",req.files);
  var clientLoginToken = req.body.loginToken;
  if(!clientLoginToken && req.files){
    clientLoginToken = req.files.myFile.name
    // console.log("a:",req.files.myFile.name.a);
  }
  console.log("clientLoginToken:",clientLoginToken);
  if(clientLoginToken){
    try{
      const { userid: userid } = jwt.verify(clientLoginToken, auth.AUTH_SECRET);
      console.log("userid:",userid);
      req.session.userid = userid ;
      console.log('session userid:',req.session.userid);
      jwt.sign({
        userid: userid
      },
      auth.AUTH_SECRET,{
        expiresIn: auth.MAX_AGE
      }
      )
      console.log("Pass Auth");
    }catch(err){
      console.log("Token invalid");
      console.log(ipList.frontend);
      return res.send({
        redirect: "/loginpage"
      });
    }
  }
  next();
}

module.exports = {
  checkAuthen : checkAuthen
}
