const getFuncSpecial = require('../utilityfunction/GetDataSpecial')
const insertFunc = require('../utilityfunction/InsertData')

async function createReview(req, res){
  console.log("Enter createReview in Coursecontroller");
  console.log(req.body);
  var userid = req.session.userid;
  var courseid = req.body.courseid;
  var description = req.body.description;
  var rating = req.body.rating;
  var reviewedtime = new Date();
  var reviewid = (await getReviewID(courseid));

  return await insertFunc.insertCourseReview(courseid,reviewid,userid,description,rating,reviewedtime)
}

function getReviewID(courseid){
  return new Promise(async(resolve, reject) => {
    var select = 'max(reviewid)'
    var from = 'coursereview'
    var atti = ['courseid']
    var value = [courseid]
    var reviewid = (await getFuncSpecial.getFunction(select,from,atti,value)).result[0]['max(reviewid)'] + 1;
    console.log("ReviewID:",reviewid);
    resolve(reviewid)
  })
}

module.exports = {
  createReview : createReview
}
