angular.module('tfm.uex').factory('ProjectService', ['$http', function($http){
    return {
		getProjects: function(){
			return getProjects();
		},
		getProject: function(projectId){
			return getProject(projectId);
		},
		addProject: function(project){
			return addProject(project);
		},
		removeProject: function(projectId){
			return removeProject(projectId);
		},
		updateProject: function(project){
			return updateProject(project);
		}
	};

	function getProjects(){
		return $http.get('/api/projects');
	}

	function getProject(projectId){
		return $http.get('/api/project/' + projectId);
	}

	function addProject(project){
		return $http.post('/api/projects', project);
	}

	function removeProject(projectId){
		return $http.delete('/api/project/' + projectId);
	}

	function updateProject(project){
		return $http.put('/api/project/' + project._id, project);
	}


}]);