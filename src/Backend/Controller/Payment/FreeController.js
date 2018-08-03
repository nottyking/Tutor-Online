const ipList = require('../../../Config/ipConfig');
const insertFunc = require('../utilityfunction/InsertData')

async function enrollFree(req, res){
  // console.log();
  // console.log("req.session:",req.session);
  var d = new Date();
  var userid = req.session.userid;
  var courseid = req.body.courseid;
  var expireddate = new Date(d.getFullYear() + 1 , d.getMonth() , d.getDate())
  console.log("userid:",userid);
  console.log("courseid:",courseid);
  console.log("expired date:",expireddate);
  var insertInfo = await insertFunc.insertEnrolledCourse(userid,courseid,expireddate);
  return insertInfo;
}

module.exports = {
  enrollFree: enrollFree
};
