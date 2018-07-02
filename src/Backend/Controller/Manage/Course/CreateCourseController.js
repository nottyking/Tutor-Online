const insertFunc = require('../../utilityfunction/InsertData')
const getFuncSpecial = require('../../utilityfunction/getDataSpecial')

async function createCourse(req, res){
  console.log("Enter createCourse in Managecontroller");
  var courseid = (await getCourseID());
  var coursename = req.body.coursename;
  var instructor = req.body.instructor;
  var price = req.body.price;
  var banner = './Image/Course/Banner/Banner' + courseid + '.jpg';
  var thumbnail = './Image/Course/Thumbnail/Thumbnail' + courseid + '.jpg';
  var description = req.body.description;
  var limitduration = req.body.limitduration;
  var createdate = new Date();
  var limitdurationtype = req.body.limitdurationtype;
  return await insertFunc.insertCourse(coursename, instructor, price, banner, thumbnail, description,
                                       limitduration, createdate, limitdurationtype);
}

function getCourseID(){
  return new Promise(async(resolve, reject) => {
    var select = 'max(courseid)'
    var from = 'course'
    var atti = []
    var value = []
    var courseid = (await getFuncSpecial.getFunction(select,from,atti,value)).result[0][select] + 1;
    console.log("courseID:",courseid);
    resolve(courseid)
  })
}

module.exports = {
  createCourse : createCourse,
}
