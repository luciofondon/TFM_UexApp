angular.module('tfm.uex').controller('PasswordController',
	['$scope', '$stateParams', '$state', 'UserService',
		function($scope, $stateParams, $state, UserService){

	var vm = this;

	$scope.register = function(){

    	$state.go('login');
	}

}]);
