/*..................................*/
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
require("./models/friend")
require("./models/user")


/*..................................*/
const User = mongoose.model("User")
const Friend = mongoose.model("Friend")


/*..................................*/
exports.friendStatus = (req, res) => {
  return jwt.verify(
    req.cookies.authToken,
    "THIS_IS_A_SECRET_STRING",
    (err, tokenPayload) => {
      if (err) {
        // Scenario 2: FAIL - Error validating token
        return res.send({ isLoggedIn: false });
      }

      const userID = tokenPayload._id;

      // check if user exists
      return User.findById(userID, (userErr, user) => {
        if (userErr || !user) {
          return res.send({ isLoggedIn: false });
        }
        return Friend.find({userId: userID, friend: req.body.friendId}, "status", (err, status) => {
          if(!err) {
            console.log("friend-status (friend status)")
            console.log(status)
            res.send(status)
          }
        })
      });
    })
}

/*..................................*/
exports.allFriends = (req, res) => {
  return jwt.verify(
    req.cookies.authToken,
    "THIS_IS_A_SECRET_STRING",
    (err, tokenPayload) => {
      if (err) {
        return res.send({ success: false });
      }

      const userID = tokenPayload._id;

      // check if user exists
      return User.findById(userID, (userErr, user) => {
        if (userErr || !user) {
          console.log("user not found")
          return res.send({ success: false });
        }

        return Friend.find({userId: userID, status: "Friends"}, "friend", (err, friends) => {
          if(!err) {
            console.log("friend-status (all friends)")
            console.log(friends)
            res.send(friends)
          }
        })

      })
    })
}

/*..................................*/
exports.allRequests = (req, res) => {
  return jwt.verify(
    req.cookies.authToken,
    "THIS_IS_A_SECRET_STRING",
    (err, tokenPayload) => {
      if (err) {
        return res.send({ success: false });
      }

      const userID = tokenPayload._id;

      // check if user exists
      return User.findById(userID, (userErr, user) => {
        if (userErr || !user) {
          console.log("user not found")
          return res.send({ success: false });
        }

        return Friend.find({userId: userID, status: "Accept"}, "friend", (err, friends) => {
          if(!err) {
            console.log("friend-status (all requests)")
            console.log(friends)
            res.send(friends)
          }
        })

      })
    })
}

/*..................................*/
exports.acceptRequest = (req, res) => {
    return jwt.verify(
    req.cookies.authToken,
    "THIS_IS_A_SECRET_STRING",
    (err, tokenPayload) => {
      if (err) {
        return res.send({ success: false });
      }

      const userID = tokenPayload._id;

      // check if user exists
      return User.findById(userID, (userErr, user) => {
        if (userErr || !user) {
          console.log("user not found")
          return res.send({ success: false });
        }

        return Friend.updateOne({userId: userID, friend: req.body.friendId}, {status: "Friends"}, (err, friends) => {
          if(!err) {
            console.log("friend-status")
            console.log(friends)
            return Friend.updateOne({userId: req.body.friendId, friend: userID}, {status: "Friends"}, (err, friends) => {
              if(!err) {
                console.log("friend-status")
                console.log(friends)
                res.send(friends)
              }
            })
          }
        })

      })
    })
}

/*..................................*/
exports.deleteRequest = (req, res) => {
  return jwt.verify(
  req.cookies.authToken,
  "THIS_IS_A_SECRET_STRING",
  (err, tokenPayload) => {
    if (err) {
      return res.send({ success: false });
    }

    const userID = tokenPayload._id;

    // check if user exists
    return User.findById(userID, (userErr, user) => {
      if (userErr || !user) {
        console.log("user not found")
        return res.send({ success: false });
      }

      return Friend.deleteOne({userId: userID, friend: req.body.friendId}, {status: "Friends"}, (err, friends) => {
        if(!err) {
          console.log("friend-status")
          console.log(friends)
          return Friend.deleteOne({userId: req.body.friendId, friend: userID}, {status: "Friends"}, (err, friends) => {
            if(!err) {
              console.log("friend-status")
              console.log(friends)
              res.send(friends)
            }
          })
        }
      })

    })
  })
}

/*..................................*/
exports.sendRequest = (req, res) => {
    return jwt.verify(
    req.cookies.authToken,
    "THIS_IS_A_SECRET_STRING",
    (err, tokenPayload) => {
      if (err) {
        return res.send({ success: false });
      }

      const userID = tokenPayload._id;

      // check if user exists
      return User.findById(userID, (userErr, user) => {
        if (userErr || !user) {
          console.log("user not found")
          return res.send({ success: false });
        }

        const newFriend = new Friend({
          userId: userID,
          friend: req.body.friendId,
          status: "Requested"
        })
        console.log(newFriend)

        newFriend.save((err) => {
          if (!err) {
            const newFriend = new Friend({
            userId: req.body.friendId,
            friend: userID,
            status: "Accept"
          })
          console.log(newFriend)

          newFriend.save((err) => {
            if (!err) { console.log("request sent");res.send({success: true})}
            else { console.log(err);res.send({success: false}) }
            })
            }
          else { console.log(err);res.send({success: false}) }
          })
      })
    })
}


























/*
 exports.addPost = async (req, res, next) =>{
  console.log(req.body)
  const newPost= await new Post({
    userID: req.body.id,
    content: req.body.content
  })

console.log(newPost)
res.send(newPost)  
  //newUser.save((err) => {
  //  if (!err) { console.log(req.body.fname +"\n"+req.body.lname +"\n"+req.body.email +"\n"+req.body.pass);res.send(newUser)}
  //  else { res.send('Unable to save game') }
  //})
}

exports.findUserByIdPOST = (req, res, next) => {
  console.log('find user by id (post)')
  console.log(req.body)
  if (!req.body.id) { return res.send('No id provided') }

  User.findOne({ _id: req.body.id}, (err, user) => {
    if (!err) { 
      console.log(user);
      if(user===null)res.send({id:false}) 
      else res.send(user)
     }
  })
}

exports.findUserByEmailPOST = (req, res, next) => {
  console.log('find user by email (post)')
  console.log(req.body)
  if (!req.body.email || !req.body.pass) { return res.send('Incomplete credentials') }

  User.findOne({email: req.body.email, password: req.body.pass}, (err, user) => {
    if (!err) { 
      console.log(user);
      if(user===null)res.send({_id:false}) 
      else res.send(user)
    }
  })
}
*/

/*
exports.findAll = (req, res, next) => {
  Game.find((err, games) => {
    if (!err) { res.send(games) }
  })
}

exports.findById = (req, res, next) => {
  if (!req.query.id) { return res.send('No id provided') }

  Game.findOne({ _id: req.query.id}, (err, game) => {
    if (!err) { res.send(game) }
  })
}

exports.findByIdPOST = (req, res, next) => {
  console.log('find by post')
  console.log(req.body)
  if (!req.body.id) { return res.send('No id provided') }

  Game.findOne({ _id: req.body.id}, (err, game) => {
    if (!err) { res.send(game) }
  })
}

exports.add = (req, res, next) => {

  const newGame = new Game({
    title: req.body.title,
    developer: req.body.developer,
    year: req.body.year,
    online: req.body.online,
    maxLocalPlayers: req.body.maxLocalPlayers
  })

  newGame.save((err) => {
    if (!err) { res.send(newGame)}
    else { res.send('Unable to save game') }
  })
}


exports.deleteById = (req, res, next) => {
  Game.findOneAndDelete({ _id: req.body.id }, (err, game) => {
    if (!err && game) {
      res.send('Successfully deleted ' + game.title)
    }
    else {
      res.send('Unable to delete game')
    }
  })
}
*/