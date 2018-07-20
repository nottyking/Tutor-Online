const deleteFunc = require('../../utilityfunction/DeleteData')
const getFunc = require('../../utilityfunction/GetDataSpecial')
const updateFunc = require('../../utilityfunction/UpdateData')
async function queryInformation(req, res){
  console.log("Enter queryInformation in ManageCourseDiscountcontroller");
  var courseDiscountInformation = (await getFunc.getFunction('*','coursediscount natural join course',[],[])).result;
  return courseDiscountInformation;
}

async function editCourseDiscount(req, res){
  console.log("Enter editCourseDiscount in Managecontroller");
  const courseid = req.body.courseid
  const coursediscountid = req.body.coursediscountid
  const coursediscountprice = req.body.coursediscountprice
  const coursediscountcreatedate = req.body.coursediscountcreatedate
  const coursediscountexpireddate = req.body.coursediscountexpireddate
  const editInfo = await updateFunc.updateCourseDiscount(['coursediscountprice','coursediscountcreatedate','coursediscountexpireddate'] ,
                                                     [coursediscountprice,coursediscountcreatedate,coursediscountexpireddate] ,
                                                     ['courseid','coursediscountid'] ,
                                                     [courseid,coursediscountid])
  return editInfo
}

async function deleteCourseDiscount(req, res){
  console.log("Enter deleteCourse in Managecontroller");
  const courseid = req.body.courseid
  const coursediscountid = req.body.coursediscountid

  return await deleteFunc.deleteCourseDiscount(courseid,coursediscountid)
}

module.exports = {
  queryInformation : queryInformation ,
  editCourseDiscount : editCourseDiscount,
  deleteCourseDiscount : deleteCourseDiscount,
}
