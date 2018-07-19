const updateFunc = require('../../utilityfunction/UpdateData')
const getFuncGeneral = require('../../utilityfunction/GetDataSpecial')
const deleteFunc = require('../../utilityfunction/DeleteData')
const insertFunc = require('../../utilityfunction/InsertData')

async function editPackageCourse(req, res){
  console.log("Enter editPackageCourse in Managecontroller");
  var packageid = req.body.packageid
  var courseList = req.body.packagecourse;
  var promise = new Promise(async(resolve, reject) => {
    resolve(await editCourse(packageid, courseList))
  })
  const Promises = [promise]
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

async function editCourse(packageid, courseList){
  console.log("Enter editCourse in EditPackageController",courseList);
  var allCourse = (await getFuncGeneral.getFunction('*','packagecourse',['packageid'],[packageid])).result
  var promises = []
  for(var i = 0 ; i < allCourse.length ; i++){
    var courseidExist = allCourse[i].courseid;
    var isPackageCourseExistInDatabase = false;
    for(var j = 0 ; j < courseList.length ; j++){
      var courseid = courseList[j].courseid;
      var packagecourseid = courseList[j].packagecourseid;
      if(courseid == courseidExist){
        isPackageCourseExistInDatabase = true ;
        break;
      }
    }
    console.log(courseid);
    if(isPackageCourseExistInDatabase){
      promises.push(new Promise(async(resolve, reject) => {
        console.log("----------------------------------->",packagecourseid,packageid,courseid);
        resolve(await updateFunc.updatePackageCourse(['packagecourseid'] ,
                                                           [packagecourseid] ,
                                                           ['packageid', 'courseid'] ,
                                                           [packageid, courseid]))
                                                         }))
    }
    else{
      promises.push(new Promise(async(resolve, reject) => {
        resolve(await deleteFunc.deleteOnePackageCourse(packageid, courseidExist))
      }))
    }
  }
  for(var i = 0 ; i < courseList.length ; i++){
    var packagecourseid = courseList[i].packagecourseid;
    var courseid = courseList[i].courseid;
    var isPackageCourseExistInDatabase = false;
    for(var j = 0 ; j < allCourse.length ; j++){
      var courseidExist = allCourse[j].courseid;
      if(courseid == courseidExist){
        isPackageCourseExistInDatabase = true ;
        break;
      }
    }
    if(!isPackageCourseExistInDatabase){
      promises.push(new Promise(async(resolve, reject) => {
        resolve(await insertFunc.insertPackageCourse(packagecourseid,packageid,courseid))
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
  editPackageCourse : editPackageCourse,
}
