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
		getAplicationsFromProjects: function(){
			return getAplicationsFromProjects();
		},
		getAplicationFromProject: function(projectId, aplicationId){
			return getAplicationFromProject(projectId, aplicationId);
		},
		deleteAplicationFromProject: function(projectId, aplicationId){
			return deleteAplicationFromProject(projectId, aplicationId);
		},
		updateAplicationFromProject: function(projectId, aplication){
			return updateAplicationFromProject(projectId, aplication);
		},
	};
	
	function getAplicationsFromProjects(){
		return $http.get('/api/projects/aplications');
	}
	
	function getAplicationFromProject(projectId, aplicationId){
		return $http.get('/api/projects/apps' + projectId + '/' + aplicationId);
	}
	
	function deleteAplicationProject(projectId, aplicationId){
		return $http.delete('/api/projects/apps' +projectId + '/' + aplicationId);
	}
	
	function updateAppProject(projectId, aplication){
		return $http.put('/api/project/aplication/' + projectId + '/' + aplication._id, aplication);
	}

	function createAppProject(projectId, aplication){
		return $http.post('/api/project/aplications/' + projectId, aplication);
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
