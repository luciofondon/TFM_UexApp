angular.module('tfm.uex').service('TemplateService', ['$http', function($http){
	return {
		createTemplate: function(projectId, template){
			return createTemplate(projectId, template);
		},
		getTemplates: function(){
			return getTemplates();
		},
		deleteTemplate: function(projectId){
			return deleteTemplate(projectId);
		},
		downloadTemplate: function(projectId){
			return downloadTemplate(projectId);
		}
	};

	function downloadTemplate(projectId){
		return $http.get('/api/template/download/' + projectId);
	}
	
	function getTemplates(){
		return $http.get('/api/templates');
	}

	function createTemplate(projectId, template){
		return $http.post('/api/templates/' + projectId, template);
	}

	function deleteTemplate(projectId){
		return $http.delete('/api/template/' + projectId);
	}

}]);
