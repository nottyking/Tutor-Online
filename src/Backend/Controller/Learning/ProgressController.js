const getFunc = require('../utilityfunction/GetDataSpecial')
const insertFunc = require('../utilityfunction/InsertData')
const updateFunc = require('../utilityfunction/UpdateData')

async function queryProgress(req, res){
  console.log("Enter queryProgress in Learningcontroller ----------------",req.body.courseid,req.body.subcourseid);
  const userid = req.session.userid
  const courseid = req.body.courseid
  const subcourseid = req.body.subcourseid
  var queryInformation = (await getFunc.getFunction('progress','subcourseprogress',
                                                      ['userid','courseid','subcourseid'],[userid,courseid,subcourseid])).result;

  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",userid,courseid,subcourseid);

  broadcastToSameUserToRedirectThisSubcourse(userid,courseid,subcourseid);

  return queryInformation[0];

}

function broadcastToSameUserToRedirectThisSubcourse(userid,courseid,subcourseid){
  console.log("\n\n\nBROADCAST\n\n\n");
  var io = require('../../Config/socket');
  // io.on('connection', (socket) => {
    console.log("\n\n\n------------------------------------------------------------Socket Connection",userid,courseid,subcourseid);
    // console.log('---->',loginToken);
    io.emit(userid, courseid, subcourseid)
    // socket.disconnect(true)
  // });
}

async function storeProgress(req, res){
  console.log("Enter queryProgress in Learningcontroller");
  const userid = req.session.userid
  const courseid = req.body.courseid
  const subcourseid = req.body.subcourseid
  const progress = req.body.progress
  var isThisProgressInDB = (await getFunc.getFunction('*','subcourseprogress',
                                                      ['userid','courseid','subcourseid'],[userid,courseid,subcourseid])).result;
  if(isThisProgressInDB.length==0){
    var storeInformation = (await insertFunc.insertSubCourseProgress(userid,courseid,subcourseid,progress)).result;
  }
  else{
    var storeInformation = (await updateFunc.updateSubCourseProgress(['progress'],[progress],['userid','courseid','subcourseid'],[userid,courseid,subcourseid])).result;
  }
  return storeInformation;
}

module.exports = {
  queryProgress : queryProgress ,
  storeProgress, storeProgress ,
}
