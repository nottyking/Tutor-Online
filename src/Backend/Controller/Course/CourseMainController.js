const getFunc = require('../utilityfunction/getDataNormal')

async function queryInformation(req, res){
  console.log("Enter queryInformation in Coursecontroller");
  var courseid = req.body.courseid
  var courseInformation = (await getFunc.getCourseWithWhere(['courseid'],[courseid])).result[0];
  var subCourseInformation = (await getFunc.getSubCourseWithWhere(['courseid'],[courseid])).result;
  console.log("courseInformation:",courseInformation[0]);
  console.log("subCourseInformation:",subCourseInformation);
  return {
    course: courseInformation,
    subCourse: subCourseInformation
  };
}

module.exports = {
  queryInformation : queryInformation
}
