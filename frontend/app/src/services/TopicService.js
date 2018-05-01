angular.module('tfm.uex').factory('TopicService', ['$http', function($http){
    return {
		createTopic: function(projectId, topic){
			return createTopic(projectId, topic);
		},
		getTopics: function(projectId){
			return getTopics(projectId);
		}
	};

	function createTopic(projectId, topic){
		return $http.post('/api/topics/project/' + projectId, topic);
	}

	function getTopics(projectId){
		return $http.get('/api/topics/project/' + projectId);
	}

}]);
