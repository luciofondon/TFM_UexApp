angular.module('tfm.uex').controller('DashboardController',
	['$stateParams', 'DashboardService', 'AmChartService',
		function($stateParams, DashboardService, AmChartService){
	
	var da = this;

	da.data = {};

	var data = [{"category":20, "total": 23}];
	AmChartService.createCharPieDonut(data, "50 Total", 'chartdiv', "Título", "Exportacion");


	DashboardService.getDataDashboard().then(function(response){
		da.data = response.data;
	});


}]);
