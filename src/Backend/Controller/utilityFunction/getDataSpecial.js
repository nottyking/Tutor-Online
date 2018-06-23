const con = require('../../Config/database')

function prepareSQLQuery(select, from, atti, value){
  var sql = 'SELECT ' + select + ' FROM ' + from
  var inWhere = []
  if(atti.length > 0){
    sql = sql + ' WHERE ' + atti[0] + " = " + "?";
    inWhere = [value[0]];
    for(var i = 1 ; i < atti.length ; i++){
      sql = sql + " AND " + atti[i] + " = ?";
      inWhere.push(value[i]);
    }
    return {
      'sql' : sql ,
      'inWhere' : inWhere
    };
  }
}

const getEnrollerCourseInformationFromUserid = async(select, from, atti, value) => {
  console.log('Enter getEnrolledCourseInformationFromUserid in getDataSpecial');
  var preparedSQLQuery = await prepareSQLQuery(select, from, atti, value);
  console.log('sql:', preparedSQLQuery.sql);
  console.log('inWhere:', preparedSQLQuery.inWhere);
  return await new Promise((resolve, reject) => {
    con.query(preparedSQLQuery.sql, preparedSQLQuery.inWhere, (err, result) => {
      console.log('result:',result);
      resolve({
        'result' : result,
        'err' : err
      });
    })
  })
}

const getFunction = {
  getEnrollerCourseInformationFromUserid : getEnrollerCourseInformationFromUserid ,
}

module.exports = getFunction ;
