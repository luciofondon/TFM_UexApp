angular.module('tfm.uex').factory('QuestionService', ['$http', function($http){
    return {
		createQuestion: function(topicId, question){
			return createQuestion(topicId, question);
		},
		updateQuestion: function(question){
			return updateQuestion(question);
		},
		deleteQuestion: function(questionId){
			return deleteQuestion(questionId);
		},
		readQuestion: function(questionId){
			return readQuestion(questionId);
		},
		createQuestionAsociate: function(topicId, question){
			return createQuestionAsociate(topicId, question);
		},
		updateQuestionAsociate: function(question){
			return updateQuestionAsociate(question);
		},
		deleteQuestionAsociate: function(questionId){
			return deleteQuestionAsociate(questionId);
		},
		readQuestionAsociate: function(questionId){
			return readQuestionAsociate(questionId);
		}
	};

	function createQuestionAsociate(topicId, question){
		return $http.post('/api/questions/topic/' + topicId, question);
	}

	function updateQuestionAsociate(question){
		return $http.put('/api/question/' + question._id, question);
	}

	function deleteQuestionAsociate(questionId){
		return $http.delete('/api/question/' + questionId);
	}

	function readQuestionAsociate(questionId){
		return $http.get('/api/question/' + questionId);
	}
	
	function createQuestion(topicId, question){
		return $http.post('/api/questions/topic/' + topicId, question);
	}

	function updateQuestion(question){
		return $http.put('/api/question/' + question._id, question);
	}

	function deleteQuestion(questionId){
		return $http.delete('/api/question/' + questionId);
	}

	function readQuestion(questionId){
		return $http.get('/api/question/' + questionId);
	}

}]);
