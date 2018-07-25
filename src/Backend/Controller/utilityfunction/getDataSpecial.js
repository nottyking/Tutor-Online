const con = require('../../Config/database')

const getFunction = async(select, from, atti, value) => {
  console.log('Enter getGeneralFunction in GetDataSpecial');
  var preparedSQLQuery = await prepareSQLQuery(select, from, atti, value, ' WHERE ');
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

const getFunctionWithOn = async(select, from, atti, value) => {
  console.log('Enter getGeneralFunctionWithOn in GetDataSpecial');
  var preparedSQLQuery = await prepareSQLQuery(select, from, atti, value, ' ON ');
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

function prepareSQLQuery(select, from, atti, value, conditionType){
  var sql = 'SELECT ' + select + ' FROM ' + from
  var inWhere = []
  if(atti.length > 0){
    sql = sql + conditionType + atti[0] + " = ?";
    inWhere = [value[0]];
    for(var i = 1 ; i < atti.length ; i++){
      sql = sql + " AND " + atti[i] + " = ?";
      inWhere.push(value[i]);
    }
  }
  return {
    'sql' : sql ,
    'inWhere' : inWhere
  };
}

const getFunctionObj = {
  getFunction : getFunction ,
  getFunctionWithOn : getFunctionWithOn,
}

module.exports = getFunctionObj ;
