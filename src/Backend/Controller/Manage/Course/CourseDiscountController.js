const deleteFunc = require('../../utilityfunction/DeleteData')
const getFunc = require('../../utilityfunction/GetDataSpecial')

async function queryInformation(req, res){
  console.log("Enter queryInformation in ManageCourseDiscountcontroller");
  var courseDiscountInformation = (await getFunc.getFunction('*','coursediscount natural join course',[],[])).result;
  return courseDiscountInformation;
}

async function editDiscountCourse(req, res){
  console.log("Enter updateDiscountCourse in Managecontroller");
  var courseid = req.body.courseid;

}

module.exports = {
  queryInformation : queryInformation ,
  editDiscountCourse : editDiscountCourse,
}
