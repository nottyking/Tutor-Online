const con = require('../../Config/database')
const updateFunc = require('../utilityFunction/UpdateData')
const getFunc = require('../utilityFunction/getDataNormal')

function updateNewProfile(req, res){
  console.log("Enter insertNewProfile in EditProfileController");
  var userid = req.session.userid
  var password = req.body.password
  var fname = req.body.fname
  var lname = req.body.lname
  var address = req.body.address
  var profileimg = req.body.profileimg
  var birthday = req.body.birthday
  var gender = req.body.gender
  updateFunc.updateUserWithUserID(['password','fname','lname','address','profileimg','birthday','gender'] ,
                                  [password,fname,lname,address,profileimg,birthday,gender] ,
                                  ['userid'] ,
                                  [userid]);
}

async function checkPassword(req, res){
  console.log("Enter checkPassword in EditProfileController");
  var userid = req.session.userid
  console.log("USERID:",userid);
  var correctedPassword = (await getFunc.getUserWithWhere(['userid'], [userid])).result.password
  var clientPassword = req.body.password;
  console.log("Corrected Password:",correctedPassword);
  console.log("Client Password:",clientPassword);
  if(correctedPassword == clientPassword)
    return true;
  else
    return false;
}

module.exports = {
  updateNewProfile: updateNewProfile,
  checkPassword: checkPassword
}
