angular.module('tfm.uex').factory('TopicService', ['$http', function($http){
    return {
		createTopic: function(projectId, topic){
			return createTopic(projectId, topic);
		}
	};

	function createTopic(projectId, topic){
		return $http.post('/api/topics/project/' + projectId, topic);
	}

}]);
