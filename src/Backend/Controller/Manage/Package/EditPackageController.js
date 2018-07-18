const updateFunc = require('../../utilityfunction/UpdateData')
const getFuncGeneral = require('../../utilityfunction/GetDataSpecial')
const deleteFunc = require('../../utilityfunction/DeleteData')
const insertFunc = require('../../utilityfunction/InsertData')

async function editPackage(req, res){
  console.log("Enter editPackage in Managecontroller");
  var packageid = req.body.packageid;
  var packagename = req.body.packagename;
  var description = req.body.description;
  var discountprice = req.body.discountprice;
  var isavailable = req.body.isavailable;

  return await updateFunc.updatePackage(['packagename','description','discountprice','isavailable'] ,
                                                     [packagename,description,discountprice,isavailable] ,
                                                     ['packageid'] ,
                                                     [packageid])
}

module.exports = {
  editPackage : editPackage,
}
