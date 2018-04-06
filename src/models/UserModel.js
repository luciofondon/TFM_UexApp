var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    crypto    = require('crypto');
    

var UserSchema = new Schema({
  name: {
    type: String
  }, 
  lastname: {
    type: String
  }, 
  email: {
      type: String
  },
  username: {
    type: String
  }, 
  password: {
    type: String
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
    let saltGenerate = crypto.randomBytes(16).toString('base64');  
    this.salt = saltGenerate;
  
    if (!password || !this.salt) 
      return '';

    this.hashed_password = crypto.pbkdf2Sync(password, saltGenerate, 10000, 64, 'sha512').toString('base64');
  },

   // Comparar la contrasena con la de BD
   equalPassword: function(password){
    return (crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64') == this.hashed_password);
  }
}


module.exports = mongoose.model('User', UserSchema);
