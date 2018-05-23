
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Modelo de mongoose para User
 */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
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
},
{
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

userSchema.methods = require("./UserModelController");

userSchema.statics.load = function(userId, callback) {
  this.findOne({ _id: userId})
    .populate("rol")
    .exec(callback);
};

mongoose.model('User', userSchema);
