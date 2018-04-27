angular.module('tfm.uex').factory('TopicService', ['$http', function($http){
    return {

		addTopic: function(projectId, topic){
			return addTopic(projectId, topic);
		},
		editTopic: function(project){
			return addProject(project);
		},
		deleteTopic: function(project){
			return addProject(project);
		},
	};

	function addTopic(projectId, topic){
		return $http.post('/api/topics/project/' + projectId, topic);
	}

	function editTopic(projectId){
		return $http.get('/api/project/' + projectId);
	}

	function deleteTopic(project){
		return $http.post('/api/projects', project);
	}

}]);
