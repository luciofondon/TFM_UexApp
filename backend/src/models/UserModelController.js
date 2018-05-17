var crypto = require('crypto');

module.exports = {
	
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
	},
	
	readAll: function(){
		
	},
	
	delete: function(){
		
	},
	
	create: function(){
		
	}
};
