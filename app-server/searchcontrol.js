const mongoose = require('mongoose')
require("./models/user")

/*..................................*/
const User = mongoose.model("User")

/*..................................*/
exports.search = (req, res) => {

  if (!req.query.s) { console.log("noquerry");return res.send({success:false}) }

  User.find({$or: [{fName: {$regex: new RegExp('^' + req.query.s)}}, {lName: {$regex: new RegExp('^' + req.query.s)}}]}, "fName lName", (err, users) => {
    if(!err) { console.log("result");console.log(users); res.send({success: true, list:users})}
  })
}

/*..................................*/
exports.userDetails = (req, res) => {
  User.findById(req.body.id, "fName lName", (err, users) => {
    if(!err) { console.log("result");console.log(users); res.send(users)}
  })
}