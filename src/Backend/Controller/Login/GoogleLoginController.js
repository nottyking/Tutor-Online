const con = require('../../Config/database')
const auth = require('../../Config/Auth')
const jwt = require('jsonwebtoken')
const insertFunc = require('../utilityfunction/InsertData')
const getFunc = require('../utilityfunction/GetDataSpecial')
const download = require('image-downloader')

async function LoginByGoogle(req, res){
  console.log('Enter login google');
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
      if(userdata[0].isbanned == 1){
        return resolve({
          result: false ,
          msg: "You are banned, please contract us."
        }) ;
      }
      userid = userdata[0].userid;
      role = userdata[0].role;
    }
    else{
      const result = (await insertFunc.insertUser(username,'-',email,'-','-','-',profileimage,2,typeid,'-','-',1)).result
      console.log(result);
      userid = result.insertId;
      role = 0;
      const options = {
        url: profileimage,
        dest: '../Frontend/Image/ProfileImage/ProfileImage' + userid + '.jpg'                  // Save to /path/to/dest/image.jpg
      }
      download.image(options)
        .then(({ filename, image }) => {
          console.log('File saved to', filename)
        })
        .catch((err) => {
          console.error(err)
        })
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
  LoginByGoogle : LoginByGoogle
}
