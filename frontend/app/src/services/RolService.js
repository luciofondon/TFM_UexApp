angular.module('tfm.uex').service('RolService', ['$http', function($http){

	return {
		readAllRoles: function(){
			return readAllRoles();
		}
	};

	function readAllRoles(){
		return $http.get('/api/roles');
	}

}]);
