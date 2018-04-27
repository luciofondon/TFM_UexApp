angular.module('tfm.uex').factory('AnswerService', ['$http', function($http){
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

	function addAnswer(questionId, answer){
		return $http.get('/api/question/' + questionId).then(function(response){
			var question = response.data;
			question.answers.push(answer);
			$http.put('/api/question/' + questionId, question);
		});
	}

	function editQuestion(topicId){
		return $http.get('/api/topics/project/' + topicId);
	}

	function deleteQuestion(topicId){
		return $http.get('/api/topics/project/' + topicId);
	}

}]);
