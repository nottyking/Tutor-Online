const routerList = {
  path : [
    '/register',
    '/login'
  ] ,
  routeTo : [
    require('./controller/register'),
    require('./controller/login')
  ]
}

module.exports = routerList ;
