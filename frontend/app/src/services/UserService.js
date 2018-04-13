angular.module('tfm.uex').factory('UserService', ['$http', function($http){
    return {
		getUsers: function(){
			return getUsers();
		},
		getUser: function(userId){
			return getUser(userId);
		},
		addUser: function(user){
			return addUser(user);
		},
		removeUser: function(userId){
			return removeUser(userId);
		},
		updateUser: function(user){
			return updateUser(user);
		},
		resetPassword: function(userId, password){
			return resetPassword(userId, password);
		},
		getMe: function(){
			return getMe();
		}		
	};

	function getUsers(){
		return $http.get('/api/users');
	}

	function getUser(userId){
		return $http.get('/api/user/' + userId);
	}

	function addUser(user){
		return $http.post('/api/user', user);
	}

	function removeUser(userId){
		return $http.delete('/api/user/' + userId);
	}

	function updateUser(user){
		return $http.put('/api/user/' + user._id, user);
	}

	function resetPassword(userId, password){
		return $http.put('/api/user/resetPassword/' + userId, password);
	}

	function getMe(){
		return	$http.get('/api/user/me');
	}


}]);