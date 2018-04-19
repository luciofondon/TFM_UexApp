
var UserSchema = require('mongoose').model('User').schema;
/*
animalSchema.query.byName = function(name) {
   return this.find({ name: new RegExp(name, 'i') });
 };

 var Animal = mongoose.model('Animal', animalSchema);
 Animal.find().byName('fido').exec(function(err, animals) {
   console.log(animals);
 });*/

 UserSchema.methods = {
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
		console.log("Entra dpm")
	  return (crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64') == this.hashedPassword);
	}
};
