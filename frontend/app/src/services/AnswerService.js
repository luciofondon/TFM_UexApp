angular.module('tfm.uex').factory('AnswerService', ['$http', function($http){
    return {
		readAnswer: function(questionId, answerId){
			return readAnswer(questionId, answerId);
		},
		createAnswer: function(questionId, answer){
			return createAnswer(questionId, answer);
		},
		updateAnswer: function(questionId, answer){
			return updateAnswer(questionId, answer);
		},
		deleteAnswer: function(questionId, answerId){
			return deleteAnswer(questionId, answerId);
		}
	};

	function createAnswer(questionId, answer){
		return $http.post('/api/answers/' + questionId, answer);
	}

	function updateAnswer(questionId, answer){
		return $http.put('/api/answer/' + questionId +  '/' + answer._id, answer);
	}

	function deleteAnswer(questionId, answerId){
		return $http.delete('/api/answer/' + questionId +  '/' + answerId);
	}

	function readAnswer(questionId, answerId){
		return $http.get('/api/answer/' + questionId +  '/' + answerId);
	}

}]);
