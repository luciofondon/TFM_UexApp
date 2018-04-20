angular.module('tfm.uex').controller('DashboardController',
	['$stateParams', 'DashboardService', 'AmChartService',
		function($stateParams, DashboardService, AmChartService){
	var vm = this;

	vm.data = {};

	var data = [{"category":20, "total": 23}];
	AmChartService.createCharPieDonut(data, "50 Total", 'chartdiv', "Título", "Exportacion");


	DashboardService.getDataDashboard().then(function(response){
		vm.data = response.data;
	});

}]);
