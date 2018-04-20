angular.module('tfm.uex').controller('LoginController',
    ['$rootScope', '$auth', '$state', 'UserService', '$window',
        function($rootScope, $auth, $state, UserService, $window){

	var login = this;
	login.email="";
	login.password="";
	login.error=null;

	if ($auth.isAuthenticated()) {
		$window.location.href = '/';
		//$state.go('projects');
	}

	login.login = function(){
		$auth.login({
			email: login.email,
			password: login.password
		})
		.then(function(){
			$window.location.href = '/';
			//$state.go('projects');
			login.$emit('login');
		})
		.catch(function(response){
			login.error = response.data.error;
		});
	}
}]);
