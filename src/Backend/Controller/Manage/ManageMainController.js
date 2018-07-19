const getFunc = require('../utilityfunction/GetDataSpecial')

async function queryInformation(req, res){
  console.log("Enter queryInformation in Managecontroller");
  var courseInformation = (await getFunc.getFunctionWithOn('*','course',[],[])).result;
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
