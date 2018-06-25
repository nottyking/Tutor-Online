const con = require('../../Config/database')

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
    sql = sql + " , " + whereKey[i] + " = ?";
    inList.push(whereValue[i]);
  }
  return {
    'sql' : sql ,
    'inList' : inList
  };
}

const updateUserWithUserID = async(setKey,setValue,whereKey,whereValue) => {
  console.log('Enter updateUserWithUserID in updateData');
  var preparedSQLQuery = await prepareSQLQuery("user",setKey,setValue,whereKey,whereValue);
  console.log('sql:', preparedSQLQuery.sql);
  console.log('inList:', preparedSQLQuery.inList);
  return await new Promise((resolve, reject) => {
    con.query(preparedSQLQuery.sql, preparedSQLQuery.inList, (err, result) => {
      console.log('result:',result);
      console.log('err:',err);
      console.log('updateUserWithUserID Success!');
    })
  })
}
// UPDATE `tutoronline`.`user` SET `email`='k212393@nwytga.com', `fname`='Fui', `lname`='not' WHERE `userid`='13';
const updateFunction = {
  updateUserWithUserID : updateUserWithUserID ,
}

module.exports = updateFunction ;
