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
			return createProject(config, project);
		},
		getIssues: function(config){
			return getIssues(config);
		},
		createIssues: function(config, projectId, issues){
			return createIssues(config, projectId, issues);
		}
	};

	function getIssues(config){
		return $http.post('/api/mediatory/read/issues', config);
	}

	function createIssues(config, issues){
		return $http.post('/api/mediatory/create/issues', {config: config, issues: issues});
	}

	function getApps(){
		return $http.get('/api/mediatory/apps');
	}

  	function checkComunication(config){
		return $http.post('/api/mediatory/check', config);
	}

  	function getProjects(config){
		return $http.post('/api/mediatory/projects', config);
	}

  	function createProject(config, project){
		return $http.post('/api/mediatory/create/projects', {config: config, project: project});
	}

}]);
