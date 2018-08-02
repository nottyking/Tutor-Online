const getFunc = require('../utilityfunction/GetData')
const getFuncGeneral = require('../utilityfunction/GetDataSpecial')
async function queryInformation(req, res){
  console.log("Enter queryInformation in Maincontroller");
  var courseInformation = (await getFunc.getCourseWithWhere(['isavailable'],[1])).result;
  var courseInformationWithLink = await addCourseLink(courseInformation);
  var courseInformationWithLinkAndDiscount = await addCourseDiscount(courseInformationWithLink);
  var packageInformation = (await getFuncGeneral.getFunction('*','package',['isavailable'],[1])).result;
  // console.log("courseInformation:",courseInformation);
  // console.log("courseInformationWithLink:",courseInformationWithLink);
  return {
    course : courseInformationWithLinkAndDiscount ,
    package : packageInformation
  }
}

async function addCourseLink(courseInfomation){
  for(var i = 0 ; i < courseInfomation.length ; i++){
    courseInfomation[i].courselink =  "/course/" + courseInfomation[i].courseid;
  }
  return courseInfomation;
}

async function addCourseDiscount(courseInformationWithLink){
  var courseDiscountInformation = (await getFuncGeneral.getFunction('*','coursediscount natural join\
    (SELECT courseid,max(coursediscountid) as coursediscountid FROM coursediscount GROUP BY courseid) k',[],[])).result;
  for(var i = 0 ; i < courseInformationWithLink.length ; i++){
    for(var j = 0 ; j < courseDiscountInformation.length ; j++){
      if(courseInformationWithLink[i].courseid == courseDiscountInformation[j].courseid && new Date(courseDiscountInformation[j].coursediscountexpireddate) >= new Date()){
        courseInformationWithLink[i].isdiscount = 1
        break;
      }
      if(j == courseDiscountInformation.length - 1){
        courseInformationWithLink[i].isdiscount = 0
      }
    }
  }
  return courseInformationWithLink;
}

module.exports = {
  queryInformation : queryInformation
}
