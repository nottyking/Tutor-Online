const con = require('../../Config/database')
const updateFunc = require('../utilityfunction/UpdateData')
const getFunc = require('../utilityfunction/GetData')
const fileUpload = require('express-fileupload');
const pathFromFrontend = "../Image/ProfileImage/";

async function updateNewProfile(req, res){
  console.log("Enter insertNewProfile in EditProfileController");
  var userid = req.session.userid
  var password = req.body.password
  var fname = req.body.fname
  var lname = req.body.lname
  var address = req.body.address
  var birthday = req.body.birthday
  var gender = req.body.gender
  var fileName = 'ProfileImage' + req.session.userid + '.jpg';
  var isbanned = req.body.isbanned
  var profileimage = pathFromFrontend + fileName

  var updateKeyList = ['password','fname','lname','address','profileimage','birthday','gender']
  var updateValueList = [password,fname,lname,address,profileimage,birthday,gender]
  if(!password){
    updateKeyList.shift();
    updateValueList.shift();
  }
  if(isbanned){
    updateKeyList.push('isbanned');
    updateValueList.push(isbanned);
  }
  var whereKeyList = ['userid']
  var whereValueList = [userid]

  return await updateFunc.updateUserWithUserID(updateKeyList, updateValueList, whereKeyList, whereValueList);
}

async function uploadProfileImage(req, res){
  console.log("Enter uploadProfileImage");
  if (req.files){
    var userid = req.session.userid;
    var fileName = 'ProfileImage' + userid + '.jpg';
    var profileImage = req.files.myFile;
    var destinationPath = '../Frontend/Image/ProfileImage/' + fileName;
    return await new Promise(async(resolve, reject) => {
      resolve(
        await profileImage.mv(destinationPath, function(err) {
          if (err){
            console.log("Move imageprofile ERROR:",err);
            return{
              result: false,
              err: err
            }
          }
          console.log("Move imageprofile SUCCESS");
          return{
            result: true,
            err: null
          }
        })
      )
    })
  }
  else
    return true;
}

async function checkPassword(req, res){
  console.log("Enter checkPassword in EditProfileController");
  var userid = req.session.userid
  console.log("USERID:",userid);
  var correctedPassword = (await getFunc.getUserWithWhere(['userid'], [userid])).result[0].password
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
  uploadProfileImage: uploadProfileImage,
  checkPassword: checkPassword
}
