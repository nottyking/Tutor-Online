const con = require('../../Config/database')
const updateFunc = require('../utilityFunction/UpdateData')
const getFunc = require('../utilityFunction/getDataNormal')
const fileUpload = require('express-fileupload');
const pathFromFrontend = "../Image/ProfileImage/";

async function updateNewProfile(req, res){
  console.log("Enter insertNewProfile in EditProfileController");
  var fileName = 'ProfileImage' + req.session.userid + '.jpg';
  var userid = req.session.userid
  var password = req.body.password
  var fname = req.body.fname
  var lname = req.body.lname
  var address = req.body.address
  var profileimg = pathFromFrontend + fileName
  var birthday = req.body.birthday
  var gender = req.body.gender
  updateFunc.updateUserWithUserID(['password','fname','lname','address','profileimg','birthday','gender'] ,
                                  [password,fname,lname,address,profileimg,birthday,gender] ,
                                  ['userid'] ,
                                  [userid]);
}

async function uploadProfileImage(req, res){
  console.log("Enter uploadProfileImage");
  console.log("req.files:",req.files);
  if (req.files){
    var userid = req.session.userid;
    console.log("Userid:",userid);
    var fileName = 'ProfileImage' + userid + '.jpg';
    var profileImage = req.files.myFile;
    console.log("ProfileImage",profileImage.mv);
    var destinationPath = '../Frontend/Image/ProfileImage/' + fileName;
    console.log("111111111111111");
    return await new Promise(async(resolve, reject) => {
      console.log("2222222222222222222222");
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
