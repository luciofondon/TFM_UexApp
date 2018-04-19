angular.module('tfm.uex').controller('SignupController',
	['$stateParams', '$state', 'UserService',
		function($stateParams, $state, UserService){

	var vm = this;

	vm.register = function(){
		UserService.signup(vm.user).then(function(response){
			$state.go('login');
		});
	}

}]);
