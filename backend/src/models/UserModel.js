var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var userSchema = new Schema({
	name: {
		type: String
	},
	lastName: {
		type: String
	},
	email: {
		type: String
	},
	userName: {
		type: String
	},
	image: {
		type: String,
		default: "user_default.png"
	},
	hashedPassword: {
		type: String,
		required: true
	},
	salt: { //Clave de codificacion de hashedPassword
		type: String,
		required: true
	},
	rol: {
		type: Schema.ObjectId,
		ref: "Rol",
		required: true
	},
	created: {
		type: Date,
		default: Date.now,
		required:true
	}
});

userSchema.methods = require("./UserModelController");


userSchema.statics.load = function(userId, callback) {
  this.findOne({ _id: userId})
    .populate("rol")
    .exec(callback);
};

mongoose.model('User', userSchema);
