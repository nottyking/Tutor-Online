const insertFunc = require('../utilityfunction/InsertData')

async function createSubCourse(req, res){
  console.log("Enter createSubCourse in Managecontroller");
  var subCourseList = req.body.subcourse;
  for(var i = 0 ; i < subCourseList.length ; i++){
    var courseid = subCourseList[i].courseid;
    var subcourseid = subCourseList[i].subcourseid;
    var subcoursename = subCourseList[i].subcoursename;
    var subcourseinfo = subCourseList[i].subcourseinfo;
    var videolink = subCourseList[i].videolink;
    var isavailable = subCourseList[i].isavailable;
    await insertFunc.insertSubCourse(courseid, subcourseid, subcoursename, subcourseinfo, videolink, isavailable);
  }
}

module.exports = {
  createSubCourse : createSubCourse,
}
