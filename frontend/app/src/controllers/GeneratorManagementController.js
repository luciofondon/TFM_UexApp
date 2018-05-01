angular.module('tfm.uex').controller('GeneratorManagementController',
    ['$stateParams', 'ProjectService', 'projectData', '$ngConfirm', 'TopicService',
        function($stateParams, ProjectService, projectData, $ngConfirm, TopicService){
	var gm = this;

    gm.tab = 0; //Tab que se mostrara en la vista
    gm.topics = [];
	gm.project = projectData.data;
    gm.topicId = ""; //Pestana de topic seleccionada

    TopicService.getTopics($stateParams.projectId).then(function(response) {
        gm.topics = response.data;
    });

    gm.setTab = function(newTab){
        gm.tab = newTab;
    };

    gm.isSet = function(tabNum){
        return gm.tab === tabNum;
	};

	gm.init = function(){
        TopicService.getTopics($stateParams.projectId).then(function(response) {
			gm.topics = response.data;
			if(gm.topics.length > 0)
			gm.topicId = $scope.topics[0]._id;
        });
    }

}]);



/*


 $scope.exportJira = function(){
        if(validateJira()){
            $http.post('/api/project/jira/' + $stateParams.projectId, $scope.project).success(function(response){
                $('#modal-jira').modal('hide');
                alert("Proyecto creado correctamente");
            }).error(function(response) {
                $scope.errores.push(response.error)
            });
        }
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
        if(validateRedmine()){
            $http.post('/api/project/redmine/' + $stateParams.projectId, $scope.project).success(function(question){
                $('#modal-redmine').modal('hide');
                alert("Proyecto creado correctamente");
            }).error(function(response) {
                $scope.errores.push(response.error)
            });
        }
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
	*/
