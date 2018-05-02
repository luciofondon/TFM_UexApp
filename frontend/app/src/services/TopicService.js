angular.module('tfm.uex').factory('TopicService', ['$http', function($http){
    return {
		readTopic: function(topicId){
			return readTopic(topicId);
		},
		createTopic: function(projectId, topic){
			return createTopic(projectId, topic);
		},
		getTopics: function(projectId){
			return getTopics(projectId);
		},
		deleteTopic: function(topicId){
			return deleteTopic(topicId);
		},
		updateTopic: function(topic){
			return updateTopic(topic);
		}
	};
	
	function readTopic(topicId){
		return $http.get('/api/topic/' + topicId);
	}
	
	function updateTopic(topic){
		return $http.put('/api/topic/' + topic._id, topic);
	}
	
	function deleteTopic(topicId){
		return $http.delete('/api/topic/' + topicId);
	}
	
	function createTopic(projectId, topic){
		return $http.post('/api/topics/project/' + projectId, topic);
	}

	function getTopics(projectId){
		return $http.get('/api/topics/project/' + projectId);
	}

}]);
