const getFunc = require('../utilityfunction/GetDataSpecial')

async function queryInformation(req, res){
  console.log("Enter queryInformation in Package<aincontroller");
  const packageid = req.body.packageid;
  const packageInformation = (await getFunc.getFunction('*','package',['packageid'],[packageid])).result[0];
  var courseInformation = (await getFunc.getFunction('courseid,coursename','course WHERE courseid in (\
                            SELECT courseid FROM packagecourse WHERE packageid = ' + packageid + ')',[],[])).result;
  courseInformation = await addCourseLink(courseInformation);
  courseInformation = await addCourseEnrolled(courseInformation,req);

  return {
    package : packageInformation ,
    course : courseInformation
  }
}

async function addCourseLink(courseInfomation){
  for(var i = 0 ; i < courseInfomation.length ; i++){
    courseInfomation[i].courselink =  "/course/" + courseInfomation[i].courseid;
  }
  return courseInfomation;
}

async function addCourseEnrolled(courseInfomation,req){
  var userid = -1
  if(req.session.userid)
    userid = req.session.userid
  var enrolledCourse = (await getFunc.getFunction('courseid,expireddate','enrolledcourse',['userid'],[userid])).result;
  for(var i = 0 ; i < courseInfomation.length ; i++){
    courseInfomation[i].expireddate =  null
    for(var j = 0 ; j < enrolledCourse.length ; j++){
      if(enrolledCourse[j].courseid == courseInfomation[i].courseid){
        courseInfomation[i].expireddate = enrolledCourse[j].expireddate;
        break;
      }
    }
  }
  return courseInfomation;
}

module.exports = {
  queryInformation : queryInformation,
}
