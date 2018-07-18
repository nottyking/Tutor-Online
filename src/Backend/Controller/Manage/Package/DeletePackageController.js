const deleteFunc = require('../../utilityfunction/DeleteData')

async function deletePackage(req, res){
  console.log("Enter deletePackage in Managecontroller");
  var packageid = req.body.packageid;

  var isPackageDeletionSuccess = (await(deleteFunc.deletePackage(packageid)))
  if(isPackageDeletionSuccess.result)
    return await deleteFunc.deletePackageCourse(packageid);
  else
    return {
      err: isSubCourseDeletionSuccess.err
    }
}

module.exports = {
  deletePackage : deletePackage,
}
