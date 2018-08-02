const getFunc = require('../utilityfunction/GetData')
const getFuncSpecial = require('../utilityfunction/GetDataSpecial')

async function queryInformation(req, res){
  console.log("Enter queryInformation in Studentcontroller");
  var userid = req.session.userid;
  var result = await getFunc.getUserWithWhere(['userid'],[userid]);
  result.result[0].src = await getFuncSpecial.getFunction('*','enrolledcourse natural join course natural join \
  (SELECT max(enrolledcourseid) as enrolledcourseid FROM enrolledcourse WHERE userid = ' + userid + ' GROUP BY userid,courseid) k',[],[])
  console.log("Result.result.src:",result.result.src);
  console.log("Result:",result);
  return result ;
}

module.exports = {
  queryInformation : queryInformation
}
