angular.module('tfm.uex').service('MediatoryService', ['$http', function($http){

	return {
		getApps: function(){
			return getApps();
		},
		checkComunication: function(config){
				return checkComunication(config);
			},
		getProjects: function(config){
			return getProjects(config);
		},
		createProject: function(config, project){
			return getProjects(config, project);
		}
	};

	function getApps(){
		return $http.get('/api/mediatory/apps');
	}

  	function checkComunication(config){
		return $http.get('/api/mediatory/apps', config);
	}

  	function getProjects(config){
		return $http.post('/api/mediatory/projects', config);
	}

  	function createProject(config){
		return $http.post('/api/mediatory/projects', {config: config, project: project});
	}

}]);
