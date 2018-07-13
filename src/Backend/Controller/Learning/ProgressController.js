const getFunc = require('../utilityfunction/GetDataSpecial')
const insertFunc = require('../utilityfunction/InsertData')

async function queryProgress(req, res){
  console.log("Enter queryProgress in Learningcontroller");
  const userid = req.body.userid
  const courseid = req.body.courseid
  const subcourseid = req.body.subcourseid
  var queryInformation = (await getFunc.getFunction('progress','subcourseprogress',
                                                      ['userid','courseid','subcourseid'],[userid,courseid,subcourseid])).result;
  return queryInformation[0];
}

async function storeProgress(req, res){
  console.log("Enter queryProgress in Learningcontroller");
  const userid = req.body.userid
  const courseid = req.body.courseid
  const subcourseid = req.body.subcourseid
  const progress = req.body.progress
  var insertInformation = (await insertFunc.insertSubCourseProgress(userid,courseid,subcourseid,progress)).result;
  return insertInformation;
}

module.exports = {
  queryProgress : queryProgress ,
  storeProgress, storeProgress ,
}
