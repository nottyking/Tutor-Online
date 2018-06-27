const getFunc = require('../utilityfunction/getDataNormal')

async function addCourseLink(courseInfomation){
  console.log("55555");
  for(var i = 0 ; i < courseInfomation.length ; i++){
    courseInfomation[i].courselink =  "/course/" + courseInfomation[i].courseid;
    console.log("66666");
  }
  console.log("77777");
  return courseInfomation;
}

async function queryInformation(req, res){
  console.log("Enter queryInformation in Maincontroller");
  console.log("11111");
  var courseInformation = (await getFunc.getCourse()).result;
  console.log("44444");
  var courseInformationWithLink = await addCourseLink(courseInformation);
  console.log("88888");
  console.log("courseInformation:",courseInformation);
  console.log("courseInformationWithLink:",courseInformationWithLink);
  return courseInformationWithLink;
}

module.exports = {
  queryInformation : queryInformation
}
