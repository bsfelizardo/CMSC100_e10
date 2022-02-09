/*..................................*/
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const friend = require('./models/friend')
require("./models/post")
require("./models/user")
require("./models/friend")


/*..................................*/
const Post = mongoose.model("Post")
const User = mongoose.model("User")
const Friend = mongoose.model("Friend")


/*..................................*/
exports.addPost = (req, res) => {
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

        const newPost = new Post({
          userId: userID,
          fName: req.body.fName,
          lName: req.body.lName,
          content: req.body.content
        })
        console.log(newPost)

        newPost.save((err) => {
          if (!err) { console.log("posted");res.send({success: true})}
          else { console.log(err);res.send({success: false}) }
          })
      })
    })
}

exports.deletePost = (req, res) => {
  Post.findByIdAndRemove(req.body.id, (err, posts) => {
    if(!err) { console.log("deleted"); res.send({success:true})}
    else { console.log("failed to delete"); res.send({success:false})}
  })
}

/*..................................*/
exports.allPosts = (req, res) => {

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
      return User.findById(userID, async (userErr, user) => {
        if (userErr || !user) {
          return res.send({ isLoggedIn: false });
        }

        let friendsList = [String(userID)]
        await Friend.find({userId: userID, status:"Friends"}, "friend", (err, friends) => {
          if(!err){
            console.log("friends of user")
            friends.map((friend, i) => friendsList = [ ...friendsList, friend.friend ])
            console.log(friendsList)
          }
        })
        
        Post.find({userId:{$in: friendsList}},(err, posts) => {
          if(!err) { console.log(posts); res.send(posts)}
        })
      });
    })
}