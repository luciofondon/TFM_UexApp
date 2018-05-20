angular.module('tfm.uex').factory('ProjectService', ['$http', function($http){
    return {
		readAllProjects: function(){
			return readAllProjects();
		},
		readProject: function(projectId){
			return readProject(projectId);
		},
		createProject: function(project){
			return createProject(project);
		},
		deleteProject: function(projectId){
			return deleteProject(projectId);
		},
		updateProject: function(project){
			return updateProject(project);
		}
	};

	function readAllProjects(){
		return $http.get('/api/projects');
	}

	function readProject(projectId){
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
