const getFunc = require('../../utilityfunction/GetDataSpecial')

async function queryInformation(req, res){
  console.log("Enter queryInformation in ManageMainPackagecontroller");
  var packageInformation = (await getFunc.getFunction('*','package',[],[])).result;
  for(var i = 0 ; i < packageInformation.length ; i++){
    const packageid = packageInformation[i].packageid;
    packageInformation[i].price = (await getFunc.getFunction('sum(price)',
                                                'course where courseid IN (SELECT courseid FROM packagecourse WHERE packageid = ' + packageid + ')',
                                                [],
                                                [])
                                              ).result[0]['sum(price)'];
  }
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
