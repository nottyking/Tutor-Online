const updateFunc = require('../../utilityfunction/UpdateData')
const getFuncGeneral = require('../../utilityfunction/GetDataSpecial')
const deleteFunc = require('../../utilityfunction/DeleteData')
const insertFunc = require('../../utilityfunction/InsertData')

async function editCourseAndSubCourse(req, res){
  console.log("Enter updateCourseAndSubCourse in Managecontroller");
  var course = req.body.course;
  var subcourse = req.body.subcourse;
  console.log();
  var Promises = [];
  console.log();
  if(course){
    var promise1 = new Promise(async(resolve, reject) => {
      resolve(await editCourse(course, req, res))
    })
    Promises.push(promise1);
  }
  if(subcourse){
    console.log("subcourse",subcourse);
    var promise2 = new Promise(async(resolve, reject) => {
      resolve(await editSubCourse(subcourse, req, res))
    })
    Promises.push(promise2);
  }
  return await Promise.all(Promises).then((response) => {
    console.log("In Promise.all");
    for(var i = 0 ; i < response.length ; i++){
      if(response[i].err)
        throw response[i].err;
    }
    console.log("Success! response",response);
    return {
      result : "success"
    }
  })
}

async function editCourse(course, req, res){
  console.log("Enter editCourse in EditCourseController");
  var coursename = course.coursename;
  var instructor = course.instructor;
  var price = course.price;
  // var banner = course.banner;
  // var thumbnail = course.thumbnail;
  var description = course.description;
  var isavailable = course.isavailable;

  var courseid = course.courseid;
  return await updateFunc.updateCourseWithCourseID(['coursename','instructor','price','description','isavailable'] ,
                                                     [coursename,instructor,price,description,isavailable] ,
                                                     ['courseid'] ,
                                                     [courseid])
}

async function uploadPicture(type, req, res){
  console.log("Enter uploadPicture");
  if (req.files){
    var courseid = req.body.courseid;
    var fileName = type + courseid + '.jpg';
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

async function editSubCourse(subCourseList, req, res){
  console.log("Enter editSubCourse in EditCourseController",subCourseList);
  var courseid = req.body.courseid;
  var allSubcourse = (await getFuncGeneral.getFunction('subcourseid','subcourse',['courseid'],[courseid])).result
  var promises = []
  for(var i = 0 ; i < allSubcourse.length ; i++){
    var subcourseidExist = allSubcourse[i].subcourseid;
    var isSubcourseExistInDatabase = false;
    for(var j = 0 ; j < subCourseList.length ; j++){
      var courseid = subCourseList[j].courseid;
      var subcourseid = subCourseList[j].subcourseid;
      var videolink = subCourseList[j].videolink;
      var subcoursename = subCourseList[j].subcoursename;
      var subcourseinfo = subCourseList[j].subcourseinfo;
      var isavailable = subCourseList[j].isavailable;
      if(subcourseid == subcourseidExist){
        isSubcourseExistInDatabase = true ;
        break;
      }
    }
    console.log(courseid);
    if(isSubcourseExistInDatabase){
      promises.push(new Promise(async(resolve, reject) => {
        resolve(await updateFunc.updateSubCourseWithCourseID(['subcoursename','subcourseinfo','videolink','isavailable'] ,
                                                           [subcoursename,subcourseinfo,videolink,isavailable] ,
                                                           ['courseid', 'subcourseid'] ,
                                                           [courseid, subcourseid]))
                                                         }))
    }
    else{
      promises.push(new Promise(async(resolve, reject) => {
        resolve(await deleteFunc.deleteOneSubCourse(courseid, subcourseidExist))
                                                         }))
    }
  }
  for(var i = 0 ; i < subCourseList.length ; i++){
    var courseid = subCourseList[i].courseid;
    var subcourseid = subCourseList[i].subcourseid;
    var videolink = subCourseList[i].videolink;
    var subcoursename = subCourseList[i].subcoursename;
    var subcourseinfo = subCourseList[i].subcourseinfo;
    var isavailable = subCourseList[i].isavailable;
    var isSubcourseExistInDatabase = false;
    for(var j = 0 ; j < allSubcourse.length ; j++){
      var subcourseidInDB = allSubcourse[j].subcourseid;
      if(subcourseid == subcourseidInDB){
        isSubcourseExistInDatabase = true ;
        break;
      }
    }
    if(!isSubcourseExistInDatabase){
      promises.push(new Promise(async(resolve, reject) => {
        resolve(await insertFunc.insertSubCourse(courseid, subcourseid, subcoursename, subcourseinfo, videolink, isavailable))
                                                         }))
    }
  }
  return Promise.all(promises).then((response) => {
    for(var i = 0 ; i < response.length ; i++){
      if(response[i].err)
        throw response[i].err;
    }
    return {
      result : "success"
    }
  })
}

module.exports = {
  editCourseAndSubCourse : editCourseAndSubCourse,
}
