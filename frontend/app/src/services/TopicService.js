angular.module('tfm.uex').factory('TopicService', ['$http', function($http){
    return {
		readTopic: function(topicId){
			return readTopic(topicId);
		},
		createTopic: function(projectId, topic){
			return createTopic(projectId, topic);
		},
		getTopics: function(aplicationId){
			return getTopics(aplicationId);
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
		return $http.post('/api/topics/aplication/' + projectId, topic);
	}

	function getTopics(aplicationId){
		return $http.get('/api/topics/aplication/' + aplicationId);
	}

}]);
