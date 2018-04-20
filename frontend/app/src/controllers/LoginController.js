angular.module('tfm.uex').controller('LoginController',
    ['$rootScope', '$auth', '$state', 'UserService', '$window',
        function($rootScope, $auth, $state, UserService, $window){

	var vm = this;
	vm.email="";
	vm.password="";
	vm.error=null;

	if ($auth.isAuthenticated()) {
		$window.location.href = '/';
		//$state.go('projects');
	}

	vm.login = function(){
		$auth.login({
			email: vm.email,
			password: vm.password
		})
		.then(function(){
			$window.location.href = '/';
			//$state.go('projects');
			vm.$emit('login');
		})
		.catch(function(response){
			vm.error = response.data.error;
		});
	}
}]);
