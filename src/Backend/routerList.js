const routerList = {
  path : [
    '/register',
    '/login'
  ] ,
  routeTo : [
    require('./Controller/Register/RegisterRouter'),
    require('./Controller/Login/LoginRouter')
  ]
}

module.exports = routerList ;
