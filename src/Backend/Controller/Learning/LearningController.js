const getFunc = require('../utilityfunction/GetDataSpecial')

async function queryInformation(req, res){
  console.log("Enter queryInformation in Learningcontroller");
  var courseid = req.body.courseid
  var learningInformation = (await getFunc.getFunction('subcourseid,subcoursename,subcourseinfo,videolink','course natural join subcourse',
                                                      ['courseid','isavailable'],[courseid,1])).result;
  learningInformation.userid = req.session.userid;
  return learningInformation;
}

module.exports = {
  queryInformation : queryInformation
}
