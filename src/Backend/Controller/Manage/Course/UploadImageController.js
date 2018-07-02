const deleteFunc = require('../../utilityfunction/DeleteData')
const getFuncSpecial = require('../../utilityfunction/GetDataSpecial')

async function uploadImage(type, req, res){
  console.log("Enter upload " + type +  " in Managecontroller");
  if (req.files){
    var courseid = (await getLastestCourseID());
    var fileName = type + courseid + '.jpg';
    var profileImage = req.files.myFile;
    var destinationPath = '../Frontend/Image/Course/' + type + '/' + fileName;
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

function getLastestCourseID(){
  return new Promise(async(resolve, reject) => {
    var select = 'max(courseid)'
    var from = 'course'
    var atti = []
    var value = []
    var courseid = (await getFuncSpecial.getFunction(select,from,atti,value)).result[0]['max(courseid)'] + 1 ;
    console.log("CourseID:",courseid);
    resolve(courseid)
  })
}

module.exports = {
  uploadImage : uploadImage,
}
