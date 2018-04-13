angular.module('tfm.uex').service('RolService', ['$http', function($http){

	return {
		getRoles: function(){
			return getRoles();
		}
	};

	function getRoles(){
		return $http.get('/api/roles');
	}

}]);
