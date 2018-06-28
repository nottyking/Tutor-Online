const con = require('../../Config/database')

const deleteCourse = async(courseid) => {
  console.log('Enter deleteCourse in deleteData');

  var preparedSQLQuery = prepareSQLQuery('course',['courseid'],[courseid]);

  console.log('sql:', preparedSQLQuery.sql);
  console.log('inList:', preparedSQLQuery.inList);
  return await doQuerySQL("deleteCourse",preparedSQLQuery.sql,preparedSQLQuery.inList);
}

const deleteSubCourse = async(courseid) => {
  console.log('Enter deleteSubCourse in deleteData');

  var preparedSQLQuery = prepareSQLQuery('subcourse',['courseid'],[courseid]);

  console.log('sql:', preparedSQLQuery.sql);
  console.log('inList:', preparedSQLQuery.inList);
  return await doQuerySQL("deleteSubCourse",preparedSQLQuery.sql,preparedSQLQuery.inList);
}

function prepareSQLQuery(deletedTable, whereKeyList, whereValueList){
  var sql = "DELETE FROM " + deletedTable + " WHERE " + whereKeyList[0] + " = ?"
  var inList = [whereValueList[0]]
  for(var i = 1 ; i < whereKeyList.length ; i++){
    sql = sql + " AND " + whereKeyList[i] + " = ?"
    inList.push(whereValueList[i])
  }
  return {
    'sql' : sql ,
    'inList' : inList
  };
}

function doQuerySQL(table, sql, inList){
  return new Promise((resolve, reject) => {
    con.query(sql, inList, (err, result) => {
      if(err){
        console.log('err:',err);
        resolve({
          err: err
        });
      }
      console.log('result:',result);
      console.log(table,': Deletion Success!');
      resolve({
        result: "success"
      });
    })
  })
}

const deleteFunction = {
  deleteCourse : deleteCourse ,
  deleteSubCourse : deleteSubCourse ,
}

module.exports = deleteFunction ;
