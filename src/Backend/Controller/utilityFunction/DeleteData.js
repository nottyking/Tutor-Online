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

const deleteOneSubCourse = async(courseid, subcourseid) => {
  console.log('Enter deleteOneSubCourse in deleteData');

  var preparedSQLQuery = prepareSQLQuery('subcourse',['courseid',['subcourseid']],[courseid,subcourseid]);

  console.log('sql:', preparedSQLQuery.sql);
  console.log('inList:', preparedSQLQuery.inList);
  return await doQuerySQL("deleteOneSubCourse",preparedSQLQuery.sql,preparedSQLQuery.inList);
}

const deleteOnePackageCourse = async(packageid, courseid) => {
  console.log('Enter deleteOnePackageCourse in deleteData');

  var preparedSQLQuery = prepareSQLQuery('packagecourse',['packageid','courseid'],[packageid,courseid]);

  console.log('sql:', preparedSQLQuery.sql);
  console.log('inList:', preparedSQLQuery.inList);
  return await doQuerySQL("deleteOnePackageCourse",preparedSQLQuery.sql,preparedSQLQuery.inList);
}

const deletePackage = async(packageid) => {
  console.log('Enter deletePackage in deleteData');

  var preparedSQLQuery = prepareSQLQuery('package',['packageid'],[packageid]);

  console.log('sql:', preparedSQLQuery.sql);
  console.log('inList:', preparedSQLQuery.inList);
  return await doQuerySQL("deletePackage",preparedSQLQuery.sql,preparedSQLQuery.inList);
}

const deletePackageCourse = async(packageid) => {
  console.log('Enter deletePackageCourse in deleteData');

  var preparedSQLQuery = prepareSQLQuery('packagecourse',['packageid'],[packageid]);

  console.log('sql:', preparedSQLQuery.sql);
  console.log('inList:', preparedSQLQuery.inList);
  return await doQuerySQL("deletePackageCourse",preparedSQLQuery.sql,preparedSQLQuery.inList);
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
  deleteOneSubCourse : deleteOneSubCourse ,
  deletePackage : deletePackage ,
  deletePackageCourse : deletePackageCourse ,
  deleteOnePackageCourse : deleteOnePackageCourse,
}

module.exports = deleteFunction ;
