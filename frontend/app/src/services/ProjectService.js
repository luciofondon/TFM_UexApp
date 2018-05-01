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
		},
		getTopics: function(projectId){
			return getTopics(projectId);
		},
		/*addTopic: function(projectId, topic){
			return addTopic(projectId, topic);
		},
		addQuestion: function(topicId, question){
			return addQuestion(topicId, question);
		},
		addAnswer: function(questionId, answer){
			return addAnswer(questionId, answer);
		}*/
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




	/*function addTopic(projectId, topic){
		return $http.post('/api/topics/project/' + projectId, topic);
	}*/

	function getTopics(projectId){
		return $http.get('/api/project/topics/' + projectId);
	}

	/*function addQuestion(topicId, question){
		return $http.post('/api/questions/topic/' + topicId, question);
	}

	function getQuestions(topicId){
		return $http.get('/api/topics/project/' + topicId);
	}

	function addAnswer(questionId, answer){
		return $http.get('/api/question/' + questionId).then(function(response){
			var question = response.data;
			question.answers.push(answer);
			$http.put('/api/question/' + questionId, question);
		});
	}*/

}]);
