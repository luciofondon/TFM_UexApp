angular.module('tfm.uex').controller('DashboardController', 
	['$scope', '$stateParams', 'DashboardService', 
		function($scope, $stateParams, DashboardService){

	$scope.data = {};

	DashboardService.getDataDashboard().then(function(response){
		$scope.data = response.data;
	});
	
}]);
