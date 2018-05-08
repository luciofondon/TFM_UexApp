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
		type: String
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
/*UserSchema.methods = {
  // Codificar contrasena
  encodePassword: function(password) {
    let saltGenerate = crypto.randomBytes(16).toString('base64');
    this.salt = saltGenerate;
    if (!password || !this.salt)
      	return '';
    this.hashedPassword = crypto.pbkdf2Sync(password, saltGenerate, 10000, 64, 'sha512').toString('base64');
  },

  // Comparar la contrasena con la de BD
  equalPassword: function(password){
    return (crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64') == this.hashedPassword);
  }
};*/

userSchema.statics.load = function(userId, callback) {
  this.findOne({ _id: userId})
    .populate("rol")
    .exec(callback);
};

mongoose.model('User', userSchema);
