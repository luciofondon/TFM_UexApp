angular.module('tfm.uex').controller('SignupController', 
	['$scope', '$stateParams', '$state', 'UserService', 
		function($scope, $stateParams, $state, UserService){

	$scope.register = function(){
		
    	$state.go('login');
	}
	
}]);
