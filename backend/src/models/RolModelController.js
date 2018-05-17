module.exports = {

	readAllRoles: function(callback){
		readAllRoles(callback);
	}

};

function readAllRoles(callback){
	this.find({}).exec(function(err, roles){
		if (err) {
			return ({error: 'No se ha podido leer los roles disponibles' });
		}
		callback(roles);
	});
}


