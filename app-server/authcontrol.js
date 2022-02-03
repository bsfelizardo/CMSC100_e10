/*..................................*/
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
require("./models/user")


/*..................................*/
const User = mongoose.model("User")

/*..................................*/
exports.signUp = (req, res) => {
  const newUser= new User({
    fName: req.body.fname,
    lName: req.body.lname,
    email: req.body.email,
    password: req.body.pass
  })

  console.log(newUser)

  newUser.save((err) => {
    if (!err) { console.log("true");res.send({success: true})}
    else { console.log("false");res.send({success: false}) }
  })
}

/*..................................*/
exports.signIn = (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password

  User.findOne({ email }, (err, user) => {
    // check if email exists
    if (err || !user) {
      //  Scenario 1: FAIL - User doesn't exist
      console.log("user doesn't exist");
      return res.send({ success: false });
    }

    // check if password is correct
    user.comparePassword(password, (err, isMatch) => {
      if (err || !isMatch) {
        // Scenario 2: FAIL - Wrong password
        console.log("wrong password");
        return res.send({ success: false });
      }

      console.log("Successfully logged in");

      // Scenario 3: SUCCESS - time to create a token
      const tokenPayload = {
        _id: user._id
      }

      const token = jwt.sign(tokenPayload, "THIS_IS_A_SECRET_STRING");

      // return the token to the client
      return res.send({ success: true, token, fName: user.fName, lName: user.lName });


    })
  })
}

/*..................................*/
exports.checkIfLoggedIn = (req, res) => {

  if (!req.cookies || !req.cookies.authToken) {
    // Scenario 1: FAIL - No cookies / no authToken cookie sent
    return res.send({ isLoggedIn: false });
  }

  // Token is present. Validate it
  return jwt.verify(
    req.cookies.authToken,
    "THIS_IS_A_SECRET_STRING",
    (err, tokenPayload) => {
      if (err) {
        // Scenario 2: FAIL - Error validating token
        return res.send({ isLoggedIn: false });
      }

      const userId = tokenPayload._id;

      // check if user exists
      return User.findById(userId, (userErr, user) => {
        if (userErr || !user) {
          // Scenario 3: FAIL - Failed to find user based on id inside token payload
          return res.send({ isLoggedIn: false });
        }

        // Scenario 4: SUCCESS - token and user id are valid
        console.log("user is currently logged in");
        return res.send({ isLoggedIn: true });
      });
    });
}