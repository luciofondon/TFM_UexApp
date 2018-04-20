angular.module('tfm.uex').controller('SignupController',
	['$auth', '$state', 'UserService',
		function($auth, $state, UserService){

	var vm = this;

	vm.signup = function(){
		console.log(vm.user)
		$auth.signup(vm.user).then(function(){
		//	$state.go('login');
		})
		.catch(function(response){
			vm.error = response.data.error;
		});

/*
		UserService.signup(vm.user).then(function(response){
			$state.go('login');
		});*/
	}

}]);
