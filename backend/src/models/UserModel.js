var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    crypto    = require('crypto');
    

var UserSchema = new Schema({
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

UserSchema.methods = {
  // Codificar contrasena
  encodePassword: function(password) {
    console.log("Codificando contrasena")
    let saltGenerate = crypto.randomBytes(16).toString('base64');
    this.salt = saltGenerate;
    console.log(this.salt)
    if (!password || !this.salt)
      return '';

    this.hashedPassword = crypto.pbkdf2Sync(password, saltGenerate, 10000, 64, 'sha512').toString('base64');
    console.log(this.hashedPassword)

  },

  // Comparar la contrasena con la de BD
  equalPassword: function(password){
    return (crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64') == this.hashedPassword);
  }
};

UserSchema.statics.load = function(userId, callback) {
  this.findOne({ _id: userId})
    .populate("rol")
    .exec(callback);
};

mongoose.model('User', UserSchema);
