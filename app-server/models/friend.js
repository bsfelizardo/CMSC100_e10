const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const friendSchema = new mongoose.Schema({
	userId: {type: String, required: true},
  	friend: {type: String, required: true},
  	status: {type: String, required:true, default: 'Add'}
})


module.exports = mongoose.model("Friend", friendSchema);