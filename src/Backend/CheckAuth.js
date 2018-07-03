const app = require('express')
const router = app.Router();
const getDataGeneral = require('./Controller/utilityFunction/GetDataSpecial')

const ROLE_NOTMATCH = "ROLE_NOTMATCH"
const TOKEN_NOTMATCH = "TOKEN_NOTMATCH"
const PASS_AUTH = "PASS_AUTH"

router.post('/', async(req, res) => {
  console.log("Enter CheckAuth");
  const userid = req.session.userid
  const userData = (await getDataGeneral.getFunction('role','user',['userid'],[userid])).result[0]
  console.log("userData:",userData);
  console.log("req role",req.body.role);
  console.log("req.session.checkAuth",req.session.checkAuth);
  if(req.session.checkAuth == "TOKEN NOT MATCH"){
    res.send({
      result : "TOKEN NOT MATCH"
    })
  }
  else if(userData.role != req.body.role){
    res.send({
      result : "ROLE NOT MATCH"
    })
  }
  else{
    res.send({
      result : "Token Valid"
    })
  }
})

module.exports = router ;
