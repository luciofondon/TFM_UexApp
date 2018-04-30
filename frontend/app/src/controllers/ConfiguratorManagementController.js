angular.module('tfm.uex').controller('ConfiguratorManagementController',
    ['$scope', '$stateParams', 'ProjectService', 'projectData', 'TemplateService', 'QuestionService', 'AnswerService', 'TopicService',
        function($scope, $stateParams, ProjectService, projectData, TemplateService, QuestionService, AnswerService, TopicService){

	$scope.tab = 0; //Tab que se mostrara en la vistas
	$scope.mode = 1; // Modo popup (1 = crear, 2 actualizar)
	$scope.topic = {};
	$scope.question = {};
	$scope.answer = {};
	$scope.template = {};
	$scope.project = projectData.data;
    $scope.topicId = ""; //Pestana de topic seleccionada
	$scope.questionId = ""; //Pregunta seleccionada para crear respuestas

    $scope.topics = [];
    $scope.questions = [];
	$scope.errores  = [];
	$scope.templates = [];

    $scope.init = function(){
        ProjectService.getTopics($stateParams.projectId).then(function(response) {
			$scope.topics = response.data;
			if($scope.topics.length > 0)
				$scope.topicId = $scope.topics[0]._id;
        });
    }

	$scope.marcarPregunta = function(questionId){
        $scope.questionId = questionId;
    };

    $scope.setTab = function(newTab){
        $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
        return $scope.tab === tabNum;
	};

	$scope.saveTemplate = function(){
		TemplateService.saveTemplate($stateParams.projectId).then(function(response) {
			$scope.topics = response.data;
			$scope.template =  {};
			$scope.alerts = [];
			$scope.alerts.push("Plantialla guardada correctamente.")
			$('#modal-template').modal('hide');
        });
	};

	//*************************************************************************/
	//************************************TOPIC********************************/
	//*************************************************************************/

	// Seleccionar el topic cuando se cambia de pestana
	$scope.selectTopic = function(topicId){
        $scope.topicId = topicId;
	};

    $scope.createTopic = function(){
        if(validateTopic()){
            TopicService.createTopic($stateParams.projectId, $scope.topic).then(function(response) {
                $scope.topic =  {};
                $scope.alerts = [];
                $scope.alerts.push("Topic creado correctamente.")
                $scope.init();
                $('#modal-topic').modal('hide');
            });
        }
    }

    function validateTopic(){
        $scope.errores = [];
        if($scope.topic.name == undefined || $scope.topic.name == "")
             $scope.errores.push("El campo nombre del topic es obligatorio");

        if($scope.errores.length > 0)
            return false;
        return true;
	}

	//*************************************************************************/
	//************************************QUESTION*****************************/
	//*************************************************************************/

	// Seleccionar el topic cuando se cambia de pestana
	/*$scope.selectQuestion = function(questionId){
        $scope.questionId = questionId;
	};*/

    $scope.createQuestion = function(){
        if(validateQuestion()){
            QuestionService.createQuestion($scope.topicId, $scope.question).then(function(response) {
                $scope.question =  {};
                $scope.alerts = [];
                $scope.alerts.push("Pregunta creada correctamente.")
                $scope.init();
                $('#modal-question').modal('hide');
            });
        }
	}

	$scope.readQuestion = function(questionId, mode){
		$scope.mode = mode != undefined ? mode : 1;
		QuestionService.readQuestion(questionId).then(function(response){
			$scope.question = response.data;
		});
	}

	$scope.updateQuestion = function(){
		QuestionService.updateQuestion($scope.question).then(function(response){
			alert("Actualizado correctamente")
			$('#modal-question').modal('hide');
			$scope.init();
		});
	}

	$scope.deleteQuestion = function(questionId){
		QuestionService.deleteQuestion(questionId).then(function(response){
			alert("Elimando correctamente")
			$scope.init();
		});
	}

	function validateQuestion (){
        $scope.errores = [];
        if($scope.question.description == undefined || $scope.question.description == "")
             $scope.errores.push("El campo nombre de la pregunta es obligatorio");
        if( $scope.errores.length > 0)
            return false
        return true;
    }

	//*************************************************************************/
	//************************************ANSWER*******************************/
	//*************************************************************************/

	$scope.readAnswer = function(questionId, answerId, mode){
		$scope.mode = mode != undefined ? mode : 1;
		$scope.questionId = questionId;
		AnswerService.readAnswer(questionId, answerId).then(function(response){
			$scope.answer = response.data;
		});
	}

	$scope.updateAnswer = function(){
		AnswerService.updateAnswer($scope.questionId, $scope.answer).then(function(response){
			alert("Actualizado correctamente")
			$('#modal-answer').modal('hide');
			$scope.init();
		});
	}

	$scope.deleteAnswer = function(questionId, answerId){
		console.log(answerId)
		AnswerService.deleteAnswer(questionId, answerId).then(function(response){
			$scope.init();
v
			alert("Respuesta eliminada correctamente")
		});
	}

    $scope.createAnswer = function(){
		AnswerService.createAnswer($scope.questionId, $scope.answer).then(function(question) {
            $scope.init();
            $('#modal-answer').modal('hide');
        });
    };

}]);
