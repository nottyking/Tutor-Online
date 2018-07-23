const getFunc = require('../utilityfunction/GetDataSpecial')

async function queryInformation(req, res){
  console.log("Enter queryInformation in Package<aincontroller");
  const packageid = req.body.packageid;
  const packageInformation = (await getFunc.getFunction('*','package',['packageid'],[packageid])).result;
  var courseInformation = (await getFunc.getFunction('courseid,coursename','course WHERE courseid in (\
                            SELECT courseid FROM packagecourse WHERE packageid = ' + packageid + ')',[],[])).result;
  courseInformation = await addCourseLink(courseInformation);
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

module.exports = {
  queryInformation : queryInformation,
}
