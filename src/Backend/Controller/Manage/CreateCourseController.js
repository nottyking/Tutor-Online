const insertFunc = require('../utilityfunction/InsertData')

async function createCourse(req, res){
  console.log("Enter createCourse in Managecontroller");
  var coursename = req.body.coursename;
  var instructor = req.body.instructor;
  var price = req.body.price;
  var banner = req.body.banner;
  var thumbnail = req.body.thumbnail;
  var description = req.body.description;
  var rating = req.body.rating;
  var limitduration = req.body.limitduration;
  var isavailable = req.body.isavailable;
  var createdate = req.body.createdate;
  var limitdurationtype = req.body.limitdurationtype;
  return await insertFunc.insertCourse(coursename, instructor, price, banner, thumbnail, description,
                                       limitduration, isavailable, createdate, limitdurationtype);
}
module.exports = {
  createCourse : createCourse,
}
