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
		}
	};

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
