const getFunc = require('../utilityfunction/getDataNormal')

async function queryInformation(req, res){
  console.log("Enter queryInformation in Coursecontroller");
  var courseid = req.body.courseid
  var courseInformation = (await getFunc.getCourseWithWhere(['courseid'],[courseid])).result;
  var subCourseInformation = (await getFunc.getSubCourseWithWhere(['courseid'],[courseid])).result;
  console.log("courseInformation:",courseInformation);
  console.log("subCourseInformation:",subCourseInformation);
  return {
    course: courseInformation,
    subCourse: subCourseInformation
  };
}

module.exports = {
  queryInformation : queryInformation
}
