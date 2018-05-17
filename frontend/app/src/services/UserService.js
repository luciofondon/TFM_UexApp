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
		signup: function(user){
			return signup(user);
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
		},
		updateMeUser: function(user){
			return updateMeUser(user);
		}
	};

	function getUsers(){
		return $http.get('/api/users');
	}

	function getUser(userId){
		return $http.get('/api/user/' + userId);
	}

	function addUser(user){
		console.log(user)
		return $http.post('/api/users', user);
	}

	function removeUser(userId){
		return $http.delete('/api/user/' + userId);
	}

	function updateUser(user){
		return $http.put('/api/user/' + user._id, user);
	}

	function updateMeUser(user){
		return $http.put('/api/user/cfg/me', user);
	}

	function resetPassword(userId, password){
		return $http.put('/api/user/resetPassword/' + userId, password);
	}

	function getMe(){
		return $http.get('/api/user/cfg/me');
	}

	function signup(user){
		return $http.post('/auth/signup', user);
	}

}]);
