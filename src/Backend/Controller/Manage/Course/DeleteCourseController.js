const deleteFunc = require('../../utilityfunction/DeleteData')

async function deleteCourse(req, res){
  console.log("Enter deleteCourse in Managecontroller");
  var courseid = req.body.courseid;

  var isSubCourseDeletionSuccess = (await(deleteFunc.deleteSubCourse(courseid)))
  if(isSubCourseDeletionSuccess.result)
    return await deleteFunc.deleteCourse(courseid);
  else
    return {
      err: isSubCourseDeletionSuccess.err
    }
}

module.exports = {
  deleteCourse : deleteCourse,
}
