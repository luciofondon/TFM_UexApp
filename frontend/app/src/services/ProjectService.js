angular.module('tfm.uex').factory('ProjectService', ['$http', function($http){
    return {
		getProjects: function(){
			return getProjects();
		},
		getProject: function(projectId){
			return getProject(projectId);
		},
		createProject: function(project){
			return createProject(project);
		},
		deleteProject: function(projectId){
			return deleteProject(projectId);
		},
		updateProject: function(project){
			return updateProject(project);
		},
		generateProject: function(templateId, project){
			return generateProject(templateId, project);
		},
		createAppProject: function(projectId, app){
			return createAppProject(projectId, app);
		},
		getAppsProject: function(){
			return getAppsProject();
		},
		getAppProject: function(projectId, appId){
			return getAppProject(projectId, appId);
		},
		deleteAppProject: function(projectId, appId){
			return getAppProject(projectId, appId);
		},
		updateAppProject: function(projectId, app){
			return createAppProject(projectId, app);
		},
	};
	
	function getAppsProject(){
		return $http.get('/api/projects/apps');
	}
	
	function getAppProject(projectId, appId){
		return $http.get('/api/projects/apps' +projectId + '/' + appId);
	}
	
	function deleteAppProject(projectId, appId){
		return $http.get('/api/projects/apps' +projectId + '/' + appId);
	}
	
	function updateAppProject(projectId, app){
		return $http.put('/api/project/app/' + projectId + '/' + app._id, app);
	}

	function createAppProject(projectId, app){
		return $http.post('/api/project/apps/' + projectId, app);
	}

	function generateProject(templateId, project){
		return $http.post('/api/project/template/' + templateId, project);
	}

	function getProjects(){
		return $http.get('/api/projects');
	}

	function getProject(projectId){
		return $http.get('/api/project/' + projectId);
	}

	function createProject(project){
		return $http.post('/api/projects', project);
	}

	function deleteProject(projectId){
		return $http.delete('/api/project/' + projectId);
	}

	function updateProject(project){
		return $http.put('/api/project/' + project._id, project);
	}

}]);
