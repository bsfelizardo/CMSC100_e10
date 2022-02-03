const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	fName: {type: String, required: true},
  	lName: {type: String, required: true},
  	email: {type: String, required: true},
  	password: {type: String, required: true}
})

userSchema.pre("save", function(next) {
	const user = this;

	if(!user.isModified("password")) return next();

	return bcrypt.genSalt((saltError, salt) => {
		if(saltError) { return next(saltError);}

		return bcrypt.hash(user.password, salt, (hashError, hash) => {
			if(hashError) { return next(hashError);}

			user.password = hash;
			return next();
		});
	});
});

userSchema.methods.comparePassword = function(password, callback) {
	bcrypt.compare(password, this.password, callback);
}


module.exports = mongoose.model("User", userSchema);