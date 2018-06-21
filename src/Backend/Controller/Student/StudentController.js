const getFunc = require('../utilityfunction/getData')

async function queryInformation(req, res){
  console.log("Enter queryInformation in Studentcontroller");
  var userid = req.session.userid;
  var result = await getFunc.getUserWithWhere(['userid'],[userid]);
  console.log("Result:",result);
  return result ;
}

module.exports = {
  queryInformation : queryInformation
}
