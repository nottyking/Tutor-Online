const getFunc = require('../utilityfunction/GetData')
const getFuncSpecial = require('../utilityfunction/GetDataSpecial')
async function queryInformation(req, res){
  console.log("Enter queryInformation in Coursecontroller");
  var userid = req.session.userid;
  var courseid = req.body.courseid
  console.log("Courseid:",courseid);
  var courseInformation = (await getFunc.getCourseWithWhere(['courseid'],[courseid])).result[0];
  var subCourseInformation = (await getFunc.getSubCourseWithWhere(['courseid'],[courseid])).result;
  var enrolledCourseInformation = (await getFuncSpecial.getFunction('*','enrolledcourse natural join course',['userid','courseid'],[userid,courseid])).result
  var reviewCourseInformation = (await getFuncSpecial.getFunction('*','enrolledcourse natural join coursereview',['userid','courseid'],[userid,courseid])).result
  var discountCourseInformation = (await getFuncSpecial.getFunction('*','coursediscount natural join\
    (SELECT courseid,max(coursediscountid) as coursediscountid FROM coursediscount WHERE courseid = ' + courseid + ') k',[],[])).result
  if(discountCourseInformation.length > 0 && new Date(discountCourseInformation[0].coursediscountexpireddate) < new Date()){
    discountCourseInformation = []
  }
  console.log("courseInformation:",courseInformation[0]);
  console.log("subCourseInformation:",subCourseInformation);
  console.log("enrolledCourseInformation:",enrolledCourseInformation);
  console.log("reviewCourseInformation:",reviewCourseInformation);
  return {
    course: courseInformation,
    subCourse: subCourseInformation,
    enrolledcourse: enrolledCourseInformation,
    reviewcourse : reviewCourseInformation,
    discountcourse : discountCourseInformation
  };
}

module.exports = {
  queryInformation : queryInformation
}
