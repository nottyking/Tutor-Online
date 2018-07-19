const getFunc = require('../utilityfunction/GetDataSpecial')

async function queryInformation(req, res){
  console.log("Enter queryInformation in Managecontroller");
  var courseInformation = (await getFunc.getFunctionWithOn('course.courseid,course.coursename,course.instructor,course.price,\
                          course.banner,course.thumbnail,course.description,course.limitduration,course.limitdurationtype,course.createdate,\
                          course.isavailable,coursediscount.coursediscountid,coursediscount.coursediscountprice,coursediscount.coursediscountcreatedate,\
                          coursediscount.coursediscountexpireddate','course LEFT JOIN coursediscount ON course.courseid = coursediscount.courseid GROUP BY course.courseid HAVING coursediscount.coursediscountid = max(coursediscount.coursediscountid)',
                          [],[])).result;
  var courseInformationWithLink = await addCourseLink(courseInformation);
  // console.log("courseInformation:",courseInformation);
  // console.log("courseInformationWithLink:",courseInformationWithLink);
  return courseInformationWithLink;
}

async function addCourseLink(courseInfomation){
  for(var i = 0 ; i < courseInfomation.length ; i++){
    courseInfomation[i].courselink =  "/course/" + courseInfomation[i].courseid;
  }
  return courseInfomation;
}

module.exports = {
  queryInformation : queryInformation,
}
