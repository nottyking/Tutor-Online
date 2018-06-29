const updateFunc = require('../../utilityfunction/UpdateData')

async function editCourseAndSubCourse(req, res){
  console.log("Enter updateCourseAndSubCourse in Managecontroller");
  var course = req.body.course;
  var subcourse = req.body.subcourse;
  var Promises = [];
  console.log();
  if(course){
    var promise1 = new Promise(async(resolve, reject) => {
      resolve(await editCourse(course, req, res))
    })
    Promises.push(promise1);
  }
  if(subcourse){
    console.log("subcourse",subcourse);
    var promise2 = new Promise(async(resolve, reject) => {
      resolve(await editSubCourse(subcourse, req, res))
    })
    Promises.push(promise2);
  }
  return await Promise.all(Promises).then((response) => {
    console.log("In Promise all");
    for(var i = 0 ; i < response.length ; i++){
      if(response[i].err)
        throw response[i].err;
    }
    // console.log("return",response);
    return {
      result : "success"
    }
  })
}

async function editCourse(course, req, res){
  console.log("Enter editCourse in EditCourseController");
  var coursename = course.coursename;
  var instructor = course.instructor;
  var price = course.price;
  // var banner = course.banner;
  // var thumbnail = course.thumbnail;
  var description = course.description;
  var isavailable = course.isavailable;

  var courseid = course.courseid;
  return await updateFunc.updateCourseWithCourseID(['coursename','instructor','price','description','isavailable'] ,
                                                     [coursename,instructor,price,description,isavailable] ,
                                                     ['courseid'] ,
                                                     [courseid])
}

async function uploadPicture(type, req, res){
  console.log("Enter uploadPicture");
  if (req.files){
    var courseid = req.body.courseid;
    var fileName = type + courseid + '.jpg';
    var profileImage = req.files.myFile;
    var destinationPath = '../Frontend/Image/ProfileImage/' + fileName;
    return await new Promise(async(resolve, reject) => {
      resolve(
        await profileImage.mv(destinationPath, function(err) {
          if (err){
            console.log("Move imageprofile ERROR:",err);
            return{
              result: false,
              err: err
            }
          }
          console.log("Move imageprofile SUCCESS");
          return{
            result: true,
            err: null
          }
        })
      )
    })
  }
  else
    return true;
}

async function editSubCourse(subCourseList){
  console.log("Enter editSubCourse in EditCourseController");
  var promises = []
  for(var i = 0 ; i < subCourseList.length ; i++){
    var courseid = subCourseList[i].courseid;
    var subcourseid = subCourseList[i].subcourseid;
    var videolink = subCourseList[i].videolink;
    var subcoursename = subCourseList[i].subcoursename;
    var subcourseinfo = subCourseList[i].subcourseinfo;
    var isavailable = subCourseList[i].isavailable;
    promises.push(new Promise(async(resolve, reject) => {
      resolve(await updateFunc.updateSubCourseWithCourseID(['subcoursename','subcourseinfo','videolink','isavailable'] ,
                                                         [subcoursename,subcourseinfo,videolink,isavailable] ,
                                                         ['courseid', 'subcourseid'] ,
                                                         [courseid, subcourseid]))
    }))
  }
  return Promise.all(promises).then((response) => {
    for(var i = 0 ; i < response.length ; i++){
      if(response[i].err)
        throw response[i].err;
    }
    return {
      result : "success"
    }
  })
}

module.exports = {
  editCourseAndSubCourse : editCourseAndSubCourse,
}
