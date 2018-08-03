const omise = require('../../Config/Omise');
const ipList = require('../../../Config/ipConfig');
const insertFunc = require('../utilityfunction/InsertData')

async function enrollFree(userid, courseid){
  // console.log();
  // console.log("req.session:",req.session);
  var d = new Date();
  var expireddate = new Date(d.getFullYear() + 1 , d.getMonth() , d.getDate())
  console.log("userid:",userid);
  console.log("courseid:",courseid);
  console.log("expired date:",expireddate);
  return await insertFunc.insertEnrolledCourse(userid,courseid,expireddate);
}

module.exports = {
  enrollFree: enrollFree
};
