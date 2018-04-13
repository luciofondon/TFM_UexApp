angular.module('tfm.uex').controller('HttpErrorController', 
	['$scope', '$stateParams', 
		function($scope, $stateParams){

	$scope.code = $stateParams.code;
	
}]);
