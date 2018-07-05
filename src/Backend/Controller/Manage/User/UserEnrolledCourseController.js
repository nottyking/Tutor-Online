const getFunc = require('../../utilityfunction/GetDataSpecial')

async function queryInformation(req, res){
  console.log("Enter queryInformation in Managecontroller");
  var userid = req.body.userid;
  var userEnrolledCourse = (await getFunc.getFunction('*','enrolledcourse natural join course',['userid'],[userid])).result;
  return userEnrolledCourse;
}

module.exports = {
  queryInformation : queryInformation,
}
