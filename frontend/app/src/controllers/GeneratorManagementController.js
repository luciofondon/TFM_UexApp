angular.module('tfm.uex').controller('GeneratorManagementController', 
    ['$scope', '$stateParams', 'ProjectService', 
        function($scope, $stateParams, ProjectService){
    
    $scope.tab = 0; //Tab que se mostrara en la vista
    $scope.topics = [];

    ProjectService.getTopics($stateParams.projectId).then(function(response) {
        $scope.topics = response.data;
    });
    
    $scope.setTab = function(newTab){
        $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
        return $scope.tab === tabNum;
	};



}]);
