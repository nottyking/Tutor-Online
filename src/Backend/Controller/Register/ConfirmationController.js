const con = require('../../Config/database')
const jwt = require('jsonwebtoken')
const EMAIL_SECRET = require('../../Config/NodeMailer').EMAIL_SECRET
const ipList = require('../../../Config/ipConfig');

function confirmRegister(req, res){
  console.log("Enter confirmtionRegister");
  console.log(EMAIL_SECRET);
  const { userid: userid } = jwt.verify(req.params.token, EMAIL_SECRET);
  console.log("userid:",userid);
  console.log(`UPDATE user SET isconfirm = '1' WHERE userid = '${userid}'`);
  con.query(`UPDATE user SET isconfirm = '1' WHERE userid = '${userid}'`, (err, result) => {
    if(err){
      console.log("Error update in confirmationregister", err);
      res.send("ERROR:",err);
    }
    return res.redirect(ipList.frontend);
  })
}

module.exports = {confirmRegister: confirmRegister};
