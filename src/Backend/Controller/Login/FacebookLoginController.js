const con = require('../../Config/database')
const auth = require('../../Config/Auth')
const jwt = require('jsonwebtoken')
const insertFunc = require('../utilityFunction/InsertData')
const getFunc = require('../utilityFunction/GetDataSpecial')

async function LoginByFacebook(req, res){
  console.log('Enter login facebook');
  return await new Promise(async(resolve, reject) => {
    console.log("userid:",userid);
    const username = req.body.username;
    const email = req.body.email;
    const profileimage = req.body.profileimage;
    const typeid = req.body.typeid;
    const userdata = (await getFunc.getFunction('*','user',['typeid'],[typeid])).result
    console.log("userdata",userdata);
    var userid;
    var role;
    if(userdata.length>0){
      userid = userdata[0].userid;
      role = userdata[0].role;
    }
    else{
      const result = (await insertFunc.insertUser(username,'-',email,'-','-','-',profileimage,1,typeid,'-','-')).result[0]
      console.log(result);
      userid = result.insertId;
      role = 0;
    }
    console.log(userid,role);
    var loginToken = (await makeAuthentication(userid));
    console.log("Login Token:",loginToken);
    resolve({
      result: true ,
      msg: "Login successful" ,
      loginToken: loginToken ,
      role: role
    }) ;
  })
}

function getLastestUserID(){
  return new Promise(async(resolve, reject) => {
    var select = 'max(userid)'
    var from = 'user'
    var atti = []
    var value = []
    var courseid = (await getFunc.getFunction(select,from,atti,value)).result[0]['max(userid)'] ;
    console.log("UserID:",userid);
    resolve(userid)
  })
}

function makeAuthentication(userid){
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

module.exports = {
  LoginByFacebook : LoginByFacebook
}
