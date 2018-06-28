const insertFunc = require('../utilityfunction/InsertData')

async function createSubCourse(req, res){
  console.log("Enter createSubCourse in Managecontroller");
  var subCourseList = req.body.subcourse;
  var promises = []
  for(var i = 0 ; i < subCourseList.length ; i++){
    var courseid = subCourseList[i].courseid;
    var subcourseid = subCourseList[i].subcourseid;
    var subcoursename = subCourseList[i].subcoursename;
    var subcourseinfo = subCourseList[i].subcourseinfo;
    var videolink = subCourseList[i].videolink;
    var isavailable = subCourseList[i].isavailable;
    promises.push(new Promise(async(resolve, reject) => {
      resolve(await insertFunc.insertSubCourse(courseid, subcourseid, subcoursename, subcourseinfo, videolink, isavailable))
    }))

  }
  return await Promise.all(promises).then((response) => {
    console.log("In Promise all");
    for(var i = 0 ; i < response.length ; i++){
      if(response[i].err)
        throw response[i].err;
    }
    // console.log("return",response);
    return {
      result : "success"
    }
  })
}

module.exports = {
  createSubCourse : createSubCourse,
}
