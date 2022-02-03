const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const postSchema = new mongoose.Schema({
	userId: {type: String, required: true},
	fName: {type: String, required: true},
	lName: {type: String, required: true},
  	content: {type: String, required: true},
  	timestamp: {type: Date, required: true, default: Date.now}
})


module.exports = mongoose.model("Post", postSchema);