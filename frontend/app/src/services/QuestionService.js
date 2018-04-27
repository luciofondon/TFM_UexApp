angular.module('tfm.uex').factory('QuestionService', ['$http', function($http){
    return {
		addQuestion: function(questionId, answer){
			return addAnswer(questionId, answer);
		},
		editQuestion: function(questionId, answer){
			return addAnswer(questionId, answer);
		},
		deleteQuestion: function(questionId, answer){
			return addAnswer(questionId, answer);
		}
	};

	function addQuestion(topicId, question){
		return $http.post('/api/questions/topic/' + topicId, question);
	}

	function editQuestion(topicId, question){
		return $http.post('/api/questions/topic/' + topicId, question);
	}

	function deleteQuestion(topicId, question){
		return $http.post('/api/questions/topic/' + topicId, question);
	}

}]);
