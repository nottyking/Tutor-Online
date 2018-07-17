const getFuncSpecial = require('../../utilityfunction/GetDataSpecial')

async function uploadImage(type, req, res){
  console.log("Enter upload " + type +  " in ManagePackagecontroller");
  if (req.files){
    var packageid = (await getLastestPackageID());
    if(req.files.packageid)
      packageid = req.files.packageid.name;
    var fileName = type + packageid + '.jpg';
    var profileImage = req.files.myFile;
    var destinationPath = '../Frontend/Image/Package/' + type + '/' + fileName;
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

function getLastestPackageID(){
  return new Promise(async(resolve, reject) => {
    var select = 'max(packageid)'
    var from = 'package'
    var atti = []
    var value = []
    var packageid = (await getFuncSpecial.getFunction(select,from,atti,value)).result[0]['max(packageid)'] ;
    console.log("packageID:",packageid);
    resolve(packageid)
  })
}

module.exports = {
  uploadImage : uploadImage,
}
