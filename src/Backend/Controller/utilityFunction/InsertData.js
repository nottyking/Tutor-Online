const con = require('../../Config/database')

function prepareSQLQuery(insert, valueText, valueList){
  var sql = "INSERT INTO " + insert + " VALUES " + valueText
  return {
    'sql' : sql ,
    'valueList' : valueList
  };
}

const InsertEnrolledCourse = async(userid, courseid, expireddate) => {
  console.log('Enter InsertEnrolledCourse in insertData');
  var preparedSQLQuery = await prepareSQLQuery("enrolledcourse (userid, courseid, expireddate)", "(?,?,?)", [userid, courseid, expireddate]);
  console.log('sql:', preparedSQLQuery.sql);
  console.log('valueList:', preparedSQLQuery.valueList);
  return await new Promise((resolve, reject) => {
    con.query(preparedSQLQuery.sql, preparedSQLQuery.valueList, (err, result) => {
      console.log('result:',result);
      console.log('err:',err);
      console.log('InsertEnrolledCourse Success!');
    })
  })
}

const insertFunction = {
  InsertEnrolledCourse : InsertEnrolledCourse ,
}

module.exports = insertFunction ;
