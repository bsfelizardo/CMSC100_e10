
const authcontrol = require('./authcontrol');
const postcontrol = require('./postcontrol')
const searchcontrol = require('./searchcontrol')
const friendcontrol = require('./friendcontrol')

module.exports = (app) => {

  // Allow Cross Origin Resource Sharing
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
  })


  app.post('/signin', authcontrol.signIn)
  app.post('/signup', authcontrol.signUp)
  app.post('/checkifloggedin', authcontrol.checkIfLoggedIn)

  app.post('/add-post', postcontrol.addPost)
  app.post('/delete-post', postcontrol.deletePost)
  app.get('/all-posts', postcontrol.allPosts)

  app.post('/user-details', searchcontrol.userDetails)
  app.get('/search', searchcontrol.search)

  app.post('/send-request', friendcontrol.sendRequest)
  app.post('/accept-request', friendcontrol.acceptRequest)
  app.post('/friend-status', friendcontrol.friendStatus)
  app.get('/all-friends', friendcontrol.allFriends)
  app.get('/all-requests', friendcontrol.allRequests)
  //app.get('/find-all', controller.findAll)
  //app.get('/find-by-id', controller.findById)
  //app.post('/add-user', controller.addUser)
  //app.post('/add-post', controller.addPost)
  //app.post('/find-user-by-id-post', controller.findUserByIdPOST)
  //app.post('/find-user-by-email-post',controller.findUserByEmailPOST) 
  //app.post('/add', controller.add)
  //app.post('/delete-by-id', controller.deleteById)
}