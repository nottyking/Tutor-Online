const deleteFunc = require('../../utilityfunction/DeleteData')

async function editDiscountCourse(req, res){
  console.log("Enter updateDiscountCourse in Managecontroller");
  var courseid = req.body.courseid;

}

module.exports = {
  editDiscountCourse : editDiscountCourse,
}
