const insertFunc = require('../../utilityfunction/InsertData')
const getFuncSpecial = require('../../utilityfunction/getDataSpecial')

async function createPackage(req, res){
  console.log("Enter createPackage in Managecontroller");
  var packageid = (await getPackageeID());
  var packagename = req.body.packagename;
  var description = req.body.description;
  var discountprice = 0;
  var banner = './Image/Package/Banner/Banner' + packageid + '.jpg';
  var thumbnail = './Image/Package/Thumbnail/Thumbnail' + packageid + '.jpg';
  var isavailable = 0;
  return await insertFunc.insertPackage(packagename,description,discountprice,banner,thumbnail,isavailable);
}

function getPackageeID(){
  return new Promise(async(resolve, reject) => {
    var select = 'max(packageid)'
    var from = 'package'
    var atti = []
    var value = []
    var courseid = (await getFuncSpecial.getFunction(select,from,atti,value)).result[0][select] + 1;
    console.log("packageID:",packageid);
    resolve(packageid)
  })
}

module.exports = {
  createPackage : createPackage,
}
