angular.module('tfm.uex').service('TemplateService', ['$http', function($http){
	return {
		createTemplate: function(aplicationId, template){
			return createTemplate(aplicationId, template);
		},
		readAllTemplates: function(){
			return readAllTemplates();
		},
		deleteTemplate: function(aplicationId){
			return deleteTemplate(aplicationId);
		},
		generateTemplateXML: function(aplicationId){
			return generateTemplateXML(aplicationId);
		}
	};

	function generateTemplateXML(aplicationId){
		return $http.get('/api/template/generate/' + aplicationId);
	}

	function readAllTemplates(){
		return $http.get('/api/templates');
	}

	function createTemplate(aplicationId, template){
		return $http.post('/api/templates/' + aplicationId, template);
	}

	function deleteTemplate(aplicationId){
		return $http.delete('/api/template/' + aplicationId);
	}

}]);
