const insertFunc = require('../../utilityfunction/InsertData')
const getFuncSpecial = require('../../utilityfunction/getDataSpecial')

async function createPackage(req, res){
  console.log("Enter createPackage in Managecontroller");
  var packagename = req.body.packagename;
  var description = req.body.description;
  var discountprice = 0;
  var isavailable = 0;
  return await insertFunc.insertPackage(packagename,description,discountprice,isavailable);
}
module.exports = {
  createPackage : createPackage,
}
