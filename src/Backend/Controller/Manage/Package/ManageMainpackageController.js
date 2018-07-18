const getFunc = require('../../utilityfunction/GetDataSpecial')

async function queryInformation(req, res){
  console.log("Enter queryInformation in ManageMainPackagecontroller");
  var packageInformation = (await getFunc.getFunction('*','package',[],[])).result;
  return packageInformation;
}

async function queryPackageCourse(req, res){
  console.log("Enter queryPackageCourse in ManageMainPackagecontroller");
  const packageid = req.body.packageid;
  var packageCourseInformation = (await getFunc.getFunction('*','packagecourse',['packageid'],[packageid])).result;
  return packageCourseInformation;
}

module.exports = {
  queryInformation : queryInformation,
  queryPackageCourse : queryPackageCourse ,
}
