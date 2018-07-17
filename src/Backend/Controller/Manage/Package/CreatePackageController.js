const insertFunc = require('../../utilityfunction/InsertData')
const getFuncSpecial = require('../../utilityfunction/getDataSpecial')

async function createPackage(req, res){
  console.log("Enter createPackage in Managecontroller");
  var packagename = req.body.packagename;
  var description = req.body.description;
  var price = req.body.price;
  var discountprice = req.body.discountprice;
  var isavailable = req.body.isavailable;
  return await insertFunc.insertPackage(packagename,description,price,discountprice,isavailable);
}
module.exports = {
  createPackage : createPackage,
}
