const getFunc = require('../utilityfunction/GetData')
const getFuncGeneral = require('../utilityfunction/GetDataSpecial')
async function addCourseLink(courseInfomation){
  for(var i = 0 ; i < courseInfomation.length ; i++){
    courseInfomation[i].courselink =  "/course/" + courseInfomation[i].courseid;
  }
  return courseInfomation;
}

async function queryInformation(req, res){
  console.log("Enter queryInformation in Maincontroller");
  var courseInformation = (await getFunc.getCourseWithWhere(['isavailable'],[1])).result;
  var courseInformationWithLink = await addCourseLink(courseInformation);
  var packageInformation = (await getFuncGeneral.getFunction('*','package',['isavailable'],[1])).result;
  // console.log("courseInformation:",courseInformation);
  // console.log("courseInformationWithLink:",courseInformationWithLink);
  return {
    course : courseInformationWithLink ,
    package : packageInformation
  }
}

module.exports = {
  queryInformation : queryInformation
}
