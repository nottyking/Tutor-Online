const getFunc = require('../../utilityfunction/GetData')

async function queryInformation(req, res){
  console.log("Enter queryInformation in ManageMainCoursecontroller");
  var userInformation = (await getFunc.getUser()).result;
  return userInformation;
}

module.exports = {
  queryInformation : queryInformation,
}
