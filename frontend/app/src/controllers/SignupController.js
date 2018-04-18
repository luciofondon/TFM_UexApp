angular.module('tfm.uex').controller('SignupController',
	['$scope', '$stateParams', '$state', 'UserService',
		function($scope, $stateParams, $state, UserService){

	var vm = this;

	$scope.register = function(){

    	$state.go('login');
	}

}]);
