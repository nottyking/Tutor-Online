const con = require('../../Config/database')

const updateUserWithUserID = async(setKey,setValue,whereKey,whereValue) => {
  console.log('Enter updateUserWithUserID in updateData');
  var preparedSQLQuery = await prepareSQLQuery("user",setKey,setValue,whereKey,whereValue);
  console.log('sql:', preparedSQLQuery.sql);
  console.log('inList:', preparedSQLQuery.inList);
  return await doQuerySQL('user',preparedSQLQuery.sql,preparedSQLQuery.inList)
}

const updateCourseWithCourseID = async(setKey,setValue,whereKey,whereValue) => {
  console.log('Enter updateCourseWithCourseID in updateData');
  var preparedSQLQuery = await prepareSQLQuery("course",setKey,setValue,whereKey,whereValue);
  console.log('sql:', preparedSQLQuery.sql);
  console.log('inList:', preparedSQLQuery.inList);
  return await doQuerySQL('course',preparedSQLQuery.sql,preparedSQLQuery.inList)
}

const updateSubCourseWithCourseID = async(setKey,setValue,whereKey,whereValue) => {
  console.log('Enter updateSubCourseWithCourseID in updateData');
  var preparedSQLQuery = await prepareSQLQuery("subcourse",setKey,setValue,whereKey,whereValue);
  console.log('sql:', preparedSQLQuery.sql);
  console.log('inList:', preparedSQLQuery.inList);
  return await doQuerySQL('subcourse',preparedSQLQuery.sql,preparedSQLQuery.inList)
} 

const updateSubCourseProgress = async(setKey,setValue,whereKey,whereValue) => {
  console.log('Enter updateSubCourseProgress in updateData');
  var preparedSQLQuery = await prepareSQLQuery("subcourseprogress",setKey,setValue,whereKey,whereValue);
  console.log('sql:', preparedSQLQuery.sql);
  console.log('inList:', preparedSQLQuery.inList);
  return await doQuerySQL('subcourse',preparedSQLQuery.sql,preparedSQLQuery.inList)
}

function prepareSQLQuery(table, setKey, setValue, whereKey, whereValue){
  var sql = 'UPDATE ' + table + ' SET ' + setKey[0] + " = " + "?"
  var inList = [setValue[0]];
  for(var i = 1 ; i < setKey.length ; i++){
    sql = sql + " , " + setKey[i] + " = ?";
    inList.push(setValue[i]);
  }
  sql = sql + " WHERE " + whereKey[0] + " = " + "?"
  inList.push(whereValue[0])
  for(var i = 1 ; i < whereKey.length ; i++){
    sql = sql + " AND " + whereKey[i] + " = ?";
    inList.push(whereValue[i]);
  }
  return {
    'sql' : sql ,
    'inList' : inList
  };
}

async function doQuerySQL(table, sql, inList){
  console.log("DO sql:",sql);
  console.log("DO List:",inList);
  return await new Promise((resolve, reject) => {
    con.query(sql, inList, (err, result) => {
      if(err){
        console.log("doQuerySQL ERR:",err);
        resolve({
          err: err
        })
      }
      console.log('result:',result);
      console.log('Update ' + table + ' Success!');
      resolve({
        result: "success"
      })
    })
  })
}

const updateFunction = {
  updateUserWithUserID : updateUserWithUserID ,
  updateCourseWithCourseID : updateCourseWithCourseID ,
  updateSubCourseWithCourseID : updateSubCourseWithCourseID ,
  updateSubCourseProgress : updateSubCourseProgress ,
}

module.exports = updateFunction ;
