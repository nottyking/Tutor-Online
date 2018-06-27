const routerList = {
  path : [
    '/register',
    '/login',
    '/payment',
    '/student',
    '/course',
    '/home' ,
    '/manage'
  ] ,
  routeTo : [
    require('./Controller/Register/RegisterRouter'),
    require('./Controller/Login/LoginRouter'),
    require('./Controller/Payment/PaymentRouter'),
    require('./Controller/Student/StudentRouter'),
    require('./Controller/Course/CourseRouter'),
    require('./Controller/Home/HomeRouter'),
    require('./Controller/Manage/ManageRouter')
  ]
}

module.exports = routerList ;
