angular.module('tfm.uex').controller('ConfiguratorManagementController', 
    ['$scope', '$stateParams', 'ProjectService', 
        function($scope, $stateParams, ProjectService){

    $scope.topic = {};
    $scope.topicId = "";
    $scope.questionId;

    $scope.question = {};
    $scope.answer = {};
    $scope.topics = []; 
    $scope.questions = [];
    $scope.project = {};
	$scope.errores  = [];
	$scope.template = {};
	$scope.templates = [];
	$scope.tab = 0; //Tab que se mostrara en la vista

    $scope.init = function(){
        ProjectService.getTopics($stateParams.projectId).then(function(response) {
			$scope.topics = response.data;
        });

        ProjectService.getProject($stateParams.projectId).then(function(response) {
            $scope.project = response.data;
		});
    }

    $scope.marcarTopic = function(topicId){
        $scope.topicId = topicId;
	};

	$scope.marcarTopicyRespuesta = function(topicId, answerId){
        $scope.topicId = topicId;
	};

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
		/*$http.post('/api/templates', $scope.template).success(function(topic) {
			$scope.template =  {};
			$scope.alerts = [];
			$scope.alerts.push("Plantialla guardada correctamente.")
			$('#modal-template').modal('hide');
		});*/
	};

    $scope.createTopic = function(){
        if(validateTopic()){
            ProjectService.addTopic($stateParams.projectId, $scope.topic).then(function(response) {
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

        if( $scope.errores.length > 0)
            return false;
        return true;
	}

    $scope.createQuestion = function(){
        if(validateQuestion()){
            ProjectService.addQuestion($scope.topicId, $scope.question).then(function(response) {
                $scope.question =  {};
                $scope.alerts = [];
                $scope.alerts.push("Pregunta creada correctamente.")
                $scope.init();
                $('#modal-question').modal('hide');
            });
        }
    }

    function validateQuestion (){
        $scope.errores = [];
        if($scope.question.description == undefined || $scope.question.description == "")
             $scope.errores.push("El campo nombre de la pregunta es obligatorio");
        if( $scope.errores.length > 0)
            return false
        else
            return true;
    }

    $scope.createAnswer = function(){
       // $http.get('/api/question/' + $scope.questionId).success(function(question) {
        //    question.answers.push($scope.answer);
        ProjectService.addAnswer($scope.questionId, $scope.answer).then(function(question) {
            $scope.init();
            $('#modal-answer').modal('hide');
        });
    };

    $scope.exportJira = function(){
        /*if(validateJira()){
            $http.post('/api/project/jira/' + $stateParams.projectId, $scope.project).success(function(response){
                $('#modal-jira').modal('hide');
                alert("Proyecto creado correctamente");
            }).error(function(response) {
                $scope.errores.push(response.error)
            });
        }*/
    }

    function validateJira (){
        $scope.errores = [];
        if($scope.project.name == undefined || $scope.project.name == "")
             $scope.errores.push("El campo nombre es obligatorio");
        else  if($scope.project.description == undefined || $scope.project.description == "")
             $scope.errores.push("El campo descripción es obligatorio");
        else  if($scope.project.key == undefined || $scope.project.key == "")
             $scope.errores.push("El campo key es obligatorio");
        else  if($scope.project.ip == undefined || $scope.project.ip == "")
             $scope.errores.push("El campo ip es obligatorio");
        else  if($scope.project.port == undefined || $scope.project.port == "")
             $scope.errores.push("El campo puerto es obligatorio");
        else  if($scope.project.user == undefined || $scope.project.user == "")
             $scope.errores.push("El campo usuario es obligatorio");
        else  if($scope.project.password == undefined || $scope.project.password == "")
             $scope.errores.push("El campo contraseña es obligatorio");

        if( $scope.errores.length > 0)
            return false
        else
            return true;
    }

    $scope.exportRedmine = function(){
        /*if(validateRedmine()){
            $http.post('/api/project/redmine/' + $stateParams.projectId, $scope.project).success(function(question){
                $('#modal-redmine').modal('hide');
                alert("Proyecto creado correctamente");
            }).error(function(response) {
                $scope.errores.push(response.error)
            });
        }*/
    }

    function validateRedmine (){
        $scope.errores = [];
        if($scope.project.name == undefined || $scope.project.name == "")
             $scope.errores.push("El campo nombre es obligatorio");
        else  if($scope.project.description == undefined || $scope.project.description == "")
             $scope.errores.push("El campo descripción es obligatorio");
        else  if($scope.project.key == undefined || $scope.project.key == "")
             $scope.errores.push("El campo key es obligatorio");
        else  if($scope.project.ip == undefined || $scope.project.ip == "")
             $scope.errores.push("El campo ip es obligatorio");
        else  if($scope.project.port == undefined || $scope.project.port == "")
             $scope.errores.push("El campo puerto es obligatorio");
        else  if($scope.project.token == undefined || $scope.project.token == "")
             $scope.errores.push("El campo token es obligatorio");

        if( $scope.errores.length > 0)
            return false
        return true;
    }

}]);
