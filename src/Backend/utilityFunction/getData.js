const con = require('./config/database')

const getUser = () => {
  console.log('Enter getUser in getData');
  con.query('SELECT * FROM user', (err, result) => {
    console.log('result:',result);
    return {
      'err' : err ,
      'result' : result
    } ;
  })
}

const getAdmin = () => {
  console.log('Enter getAdmin in getData');
  con.query('SELECT * FROM admin', (err, result) => {
    return {
      'err' : err ,
      'result' : result
    } ;
  })
}

const getStudent = () => {
  console.log('Enter getStudent in getData');
  con.query('SELECT * FROM student', (err, result) => {
    return {
      'err' : err ,
      'result' : result
    } ;
  })
}

const getCourse = () => {
  console.log('Enter getCourse in getData');
  con.query('SELECT * FROM course', (err, result) => {
    return {
      'err' : err ,
      'result' : result
    } ;
  })
}

const getRegisteredCourse = () => {
  console.log('Enter getRegisteredCourse in getData');
  con.query('SELECT * FROM registeredcourse', (err, result) => {
    return {
      'err' : err ,
      'result' : result
    } ;
  })
}

const getPayment = () => {
  console.log('Enter getPayment in getData');
  con.query('SELECT * FROM payment', (err, result) => {
    return {
      'err' : err ,
      'result' : result
    } ;
  })
}

const getSubCourse = () => {
  console.log('Enter getSubCourse in getData');
  con.query('SELECT * FROM subcourse', (err, result) => {
    return {
      'err' : err ,
      'result' : result
    } ;
  })
}

function prepareSQLQuery(name,atti,value){
  var sql = 'SELECT * FROM ' + name + ' WHERE ? = ?'
  var inWhere = [atti[0], value[0]];
  for(var i = 1 ; i < atti.length ; i++){
    sql = sql + " AND ? = ?";
    inWhere.push(atti[i]);
    inWhere.push(value[i]);
  }
  return {
    'sql' : sql ,
    'inWhere' : inWhere
  };
}

const getUserWithWhere = (atti, value) => {
  console.log('Enter getUserWithWhere in getData');
  var preparedSQLQuery = prepareSQLQuery('User',atti,value);
  console.log('sql:', preparedSQLQuery.sql);
  console.log('inWhere:', preparedSQLQuery.inWhere);
  con.query(preparedSQLQuery.sql, preparedSQLQuery.inWhere, (err, result) => {
    console.log('result:',result);
    return {
      'err' : err ,
      'result' : result
    } ;
  })
}

const getAdminWithWhere = (atti, value) => {
  console.log('Enter getAdminWithWhere in getData');
  var preparedSQLQuery = prepareSQLQuery('Admin',atti,value);
  console.log('sql:', preparedSQLQuery.sql);
  console.log('inWhere:', preparedSQLQuery.inWhere);
  con.query(preparedSQLQuery.sql, preparedSQLQuery.inWhere, (err, result) => {
    console.log('result:',result);
    return {
      'err' : err ,
      'result' : result
    } ;
  })
}

const getStudentWithWhere = (atti, value) => {
  console.log('Enter getStudentWithWhere in getData');
  var preparedSQLQuery = prepareSQLQuery('Student',atti,value);
  console.log('sql:', preparedSQLQuery.sql);
  console.log('inWhere:', preparedSQLQuery.inWhere);
  con.query(preparedSQLQuery.sql, preparedSQLQuery.inWhere, (err, result) => {
    console.log('result:',result);
    return {
      'err' : err ,
      'result' : result
    } ;
  })
}

const getCourseWithWhere = (atti, value) => {
  console.log('Enter getCourseWithWhere in getData');
  var preparedSQLQuery = prepareSQLQuery('course',atti,value);
  console.log('sql:', preparedSQLQuery.sql);
  console.log('inWhere:', preparedSQLQuery.inWhere);
  con.query(preparedSQLQuery.sql, preparedSQLQuery.inWhere, (err, result) => {
    console.log('result:',result);
    return {
      'err' : err ,
      'result' : result
    } ;
  })
}

const getRegisteredCourseWithWhere = (atti, value) => {
  console.log('Enter getRegisteredCourseWithWhere in getData');
  var preparedSQLQuery = prepareSQLQuery('registeredcourse',atti,value);
  console.log('sql:', preparedSQLQuery.sql);
  console.log('inWhere:', preparedSQLQuery.inWhere);
  con.query(preparedSQLQuery.sql, preparedSQLQuery.inWhere, (err, result) => {
    console.log('result:',result);
    return {
      'err' : err ,
      'result' : result
    } ;
  })
}

const getPaymentWithWhere = (atti, value) => {
  console.log('Enter getPaymentWithWhere in getData');
  var preparedSQLQuery = prepareSQLQuery('payment',atti,value);
  console.log('sql:', preparedSQLQuery.sql);
  console.log('inWhere:', preparedSQLQuery.inWhere);
  con.query(preparedSQLQuery.sql, preparedSQLQuery.inWhere, (err, result) => {
    console.log('result:',result);
    return {
      'err' : err ,
      'result' : result
    } ;
  })
}

const getSubCourseWithWhere = (atti, value) => {
  console.log('Enter getSubCourseWithWhere in getData');
  var preparedSQLQuery = prepareSQLQuery('subcourse',atti,value);
  console.log('sql:', preparedSQLQuery.sql);
  console.log('inWhere:', preparedSQLQuery.inWhere);
  con.query(preparedSQLQuery.sql, preparedSQLQuery.inWhere, (err, result) => {
    console.log('result:',result);
    return {
      'err' : err ,
      'result' : result
    } ;
  })
}

const getFunction = {
  'getUser' : getUser ,
  'getAdmin' : getAdmin ,
  'getStudent' : getStudent ,
  'getCourse' : getCourse ,
  'getRegisteredCourse' : getRegisteredCourse ,
  'getPayment' : getPayment ,
  'getSubCourse' : getSubCourse ,
  'getUserWithWhere' : getUserWithWhere ,
  'getAdminWithWhere' : getAdminWithWhere ,
  'getStudentWithWhere' : getStudentWithWhere ,
  'getCourseWithWhere' : getCourseWithWhere ,
  'getRegisteredCourseWithWhere' : getRegisteredCourseWithWhere ,
  'getPaymentWithWhere' : getPaymentWithWhere ,
  'getSubCourseWithWhere' : getSubCourseWithWhere
}

module.exports = getFunction ;
