module.exports = {

	readAllRoles: function(){
		this.find({}).exec(function(err, roles){
			if (err) {
				return ({error: 'Cannot list all the roles' });
			}
			return ({info: roles});
		});
	}

};


