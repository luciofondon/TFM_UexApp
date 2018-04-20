angular.module('tfm.uex').service('TemplateService', ['$http', function($http){

	return {
		saveTemplate: function(projectId){
			return saveTemplate(projectId);
		},
		getTemplates: function(){
			return getTemplates();
		},
	};

	function getTemplates(projectId){
		return $http.get('/api/templates');
	}

}]);
