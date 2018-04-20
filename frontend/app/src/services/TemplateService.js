angular.module('tfm.uex').service('TemplateService', ['$http', function($http){

	return {
		saveTemplate: function(projectId){
			return saveTemplate(projectId);
		}
	};

	function saveTemplate(projectId){
		return $http.post('/api/template/' + projectId);
	}

}]);
