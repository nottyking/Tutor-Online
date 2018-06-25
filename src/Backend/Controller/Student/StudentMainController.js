const getFunc = require('../utilityfunction/getDataNormal')
const getFuncSpecial = require('../utilityfunction/getDataSpecial')

async function queryInformation(req, res){
  console.log("Enter queryInformation in Studentcontroller");
  var userid = req.session.userid;
  var result = await getFunc.getUserWithWhere(['userid'],[userid]);
  result.result.src = await getFuncSpecial.getEnrollerCourseInformationFromUserid('*','enrolledcourse natural join course',['userid'],[userid])
  console.log("Result.result.src:",result.result.src);
  console.log("Result:",result);
  return result ;
}

module.exports = {
  queryInformation : queryInformation
}
