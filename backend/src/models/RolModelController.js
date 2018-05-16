module.exports = {

	readAllRoles: function(){
		this.find({}).exec(function(err, roles){
			if (err) {
				return ({error: 'No se ha podido leer los roles disponibles' });
			}
			return (roles);
		});
	}

};


