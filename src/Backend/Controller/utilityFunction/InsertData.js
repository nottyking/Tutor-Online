const con = require('../../Config/database')

const insertUser = async(username,password,email,fname,lname,address,profileimage,type,typeid,birthday,gender,isconfirm) => {
  console.log('Enter InsertEnrolledCourse in insertData');

  var preparedSQLQuery = prepareSQLQuery(
    "user (username,password,email,fname,lname,address,profileimage,type,typeid,birthday,gender,isconfirm)",
    "(?,?,?,?,?,?,?,?,?,?,?,?)",
    [username,password,email,fname,lname,address,profileimage,type,typeid,birthday,gender,isconfirm]
  );

  console.log('sql:', preparedSQLQuery.sql);
  console.log('valueList:', preparedSQLQuery.valueList);
  return await doQuerySQL("user",preparedSQLQuery.sql,preparedSQLQuery.valueList);
}

const insertEnrolledCourse = async(userid, courseid, expireddate) => {
  console.log('Enter InsertEnrolledCourse in insertData');

  var preparedSQLQuery = prepareSQLQuery(
    "enrolledcourse (userid, courseid, expireddate)",
    "(?,?,?)",
    [userid, courseid, expireddate]
  );

  console.log('sql:', preparedSQLQuery.sql);
  console.log('valueList:', preparedSQLQuery.valueList);
  return await doQuerySQL("EnrolledCourse",preparedSQLQuery.sql,preparedSQLQuery.valueList);
}

const insertCourse = async(coursename, instructor, price, banner, thumbnail, description,
                           limitduration, createdate, limitdurationtype) => {
  console.log('Enter InsertCourse in insertData');

  var preparedSQLQuery = prepareSQLQuery(
    "course (coursename, instructor, price, banner, thumbnail, description,limitduration, createdate, limitdurationtype)",
    "(?,?,?,?,?,?,?,?,?)",
    [coursename, instructor, price, banner, thumbnail, description,limitduration, createdate, limitdurationtype]
  );

  console.log('sql:', preparedSQLQuery.sql);
  console.log('valueList:', preparedSQLQuery.valueList);
  return await doQuerySQL("Course",preparedSQLQuery.sql,preparedSQLQuery.valueList);
}

const insertSubCourse = async(courseid, subcourseid, subcoursename, subcourseinfo, videolink, isavailable) => {
  console.log('Enter insertSubCourse in insertData');

  var preparedSQLQuery = prepareSQLQuery(
    "subcourse (courseid, subcourseid, subcoursename, subcourseinfo, videolink, isavailable)",
    "(?,?,?,?,?,?)",
    [courseid, subcourseid, subcoursename, subcourseinfo, videolink, isavailable]
  );

  console.log('sql:', preparedSQLQuery.sql);
  console.log('valueList:', preparedSQLQuery.valueList);
  return await doQuerySQL("Subcourse",preparedSQLQuery.sql,preparedSQLQuery.valueList);
}

const insertCourseReview = async(courseid,reviewid,userid,description,rating,reviewedtime) => {
  console.log('Enter insertCourseReview in insertData');

  var preparedSQLQuery = prepareSQLQuery(
    "coursereview (courseid,reviewid,userid,description,rating,reviewedtime)",
    "(?,?,?,?,?,?)",
    [courseid,reviewid,userid,description,rating,reviewedtime]
  );

  console.log('sql:', preparedSQLQuery.sql);
  console.log('valueList:', preparedSQLQuery.valueList);
  return await doQuerySQL("courseReview",preparedSQLQuery.sql,preparedSQLQuery.valueList);
}

const insertSubCourseProgress = async(userid,courseid,subcourseid,progress) => {
  console.log('Enter insertSubCourseProgress in insertData');

  var preparedSQLQuery = prepareSQLQuery(
    "subcourseprogress (userid,courseid,subcourseid,progress)",
    "(?,?,?,?)",
    [userid,courseid,subcourseid,progress]
  );

  console.log('sql:', preparedSQLQuery.sql);
  console.log('valueList:', preparedSQLQuery.valueList);
  return await doQuerySQL("courseReview",preparedSQLQuery.sql,preparedSQLQuery.valueList);
}

function prepareSQLQuery(insert, valueText, valueList){
  var sql = "INSERT INTO " + insert + " VALUES " + valueText
  return {
    'sql' : sql ,
    'valueList' : valueList
  };
}

function doQuerySQL(table, sql, valueList){
  return new Promise((resolve, reject) => {
    con.query(sql, valueList, (err, result) => {
      if(err){
        console.log('err:',err);
        resolve({
          err: err
        });
      }
      console.log('result:',result);
      console.log('Insert ' + table + ' Success!');
      resolve({
        result: result ,
        msg : "success"
      });
    })
  })
}

const insertFunction = {
  insertUser : insertUser ,
  insertEnrolledCourse : insertEnrolledCourse ,
  insertCourse : insertCourse,
  insertSubCourse : insertSubCourse,
  insertCourseReview : insertCourseReview,
  insertSubCourseProgress: insertSubCourseProgress ,
}

module.exports = insertFunction ;
