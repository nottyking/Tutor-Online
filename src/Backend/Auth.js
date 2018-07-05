const auth = require('./Config/Auth')
const ipList = require('../Config/ipConfig')
const jwt = require('jsonwebtoken')

async function checkAuthen(req, res, next){
  console.log("CHECK AUTH IN SERVER");
  console.log("SESSION USERID:",req.session.userid);
  console.log("FILES",req.files);
  console.log("BODY:",req.body);

  // get client logintoken
  var clientLoginToken = req.body.loginToken;
  if(!clientLoginToken && req.files){
    clientLoginToken = req.files.myFile.name
  }
  console.log("clientLoginToken:",clientLoginToken);

  if(clientLoginToken){
    try{
      // check clienttoken with servertoken
      const { userid: userid } = await jwt.verify(clientLoginToken, auth.AUTH_SECRET);
      console.log("userid:",userid);
      req.session.userid = userid ;
      console.log('session userid:',req.session.userid);

      // store token in server side
      await jwt.sign({
        userid: userid
      },
      auth.AUTH_SECRET,{
        expiresIn: auth.MAX_AGE
      }
      )
      console.log("Pass Auth");

    }catch(err){

      // token not match
      console.log("Token invalid $%#^#^$#^$$^#^$#^$#^$#$#$^^$#^$$^#^$");
      req.session.checkAuth = "TOKEN NOT MATCH";
      return res.send({
        result : "TOKEN NOT MATCH" ,
        redirect: "/loginpage"
      })
    }
  }
  next();
}

module.exports = {
  checkAuthen : checkAuthen
}
