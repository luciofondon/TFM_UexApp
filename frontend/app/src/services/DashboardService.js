angular.module('tfm.uex').service('DashboardService', ['$http', function($http){

	return {
		getDataDashboard: function(){
			return getDataDashboard();
		}
	};

	function getDataDashboard(){
		return $http.get('/api/dashboard');
	}

}]);
