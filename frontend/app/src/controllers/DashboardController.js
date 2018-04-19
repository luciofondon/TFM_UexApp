angular.module('tfm.uex').controller('DashboardController',
	['$scope', '$stateParams', 'DashboardService', 'AmChartService',
		function($scope, $stateParams, DashboardService, AmChartService){

	$scope.data = {};

	var data = [{"category":20, "total": 23}];
	AmChartService.createCharPieDonut(data, "50 Total", 'chartdiv', "Título", "Exportacion");


	DashboardService.getDataDashboard().then(function(response){
		$scope.data = response.data;
	});

}]);
