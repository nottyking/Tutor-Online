const getFunc = require('../../utilityfunction/GetDataSpecial')

async function queryInformation(req, res){
  console.log("Enter queryInformation in ManageMainPackagecontroller");
  var packageInformation = (await getFunc.getFunction('*','package',[],[])).result;
  return packageInformation;
}

module.exports = {
  queryInformation : queryInformation,
}
