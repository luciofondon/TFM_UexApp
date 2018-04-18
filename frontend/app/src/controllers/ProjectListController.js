angular.module('tfm.uex').controller('ProjectListController',
    ['$scope', '$rootScope', 'ProjectService', 'BootstrapTableService', '$state',
        function($scope, $rootScope, ProjectService, BootstrapTableService, $state){

    $scope.bsTableProject = {};
    $scope.alerts = [];
    $scope.errores = [];
    $scope.project = {};
    $scope.mode = 1;
	$scope.templates = [];

	$scope.init = function(){
        ProjectService.getProjects().then(function(response) {
            $scope.templates = response.data;
        });
	};

    $scope.createProject = function (){
        if(validate()){
            ProjectService.addProject($scope.project).then(function(project) {
                $scope.project =  {};
                $scope.loadProjectList();
                $scope.alerts = [];
                $scope.alerts.push("Proyecto creado correctamente.")
                $('#modal-project').modal('hide');
                ProjectService.getProjects().then(function(projects) {
                    $rootScope.projects = projects; //Actualizar proyectos del menu laterail
                });
            });
        }
    }

    function validate(){
        $scope.errores = [];
        if($scope.project.name == undefined || $scope.project.name == "")
             $scope.errores.push("El campo nombre de proyecto es obligatorio");

        if( $scope.errores.length > 0)
            return false
        return true;
    }

    $scope.updateProject = function() {
        if(validate()){
            ProjectService.updateProject($scope.project).then(function(alarm, status) {
                $scope.loadProjectList();
                $('#modal-project').modal('hide');
                //Actualizamos el menu lateral
                $http.get('/api/projects').then(function(response) {
                    $rootScope.projects = response.data;
                });
            });
        }
    };

	$scope.loadProjectList = function(){
        ProjectService.getProjects().then(function(response) {

            var projects = response.data;
            projects.forEach(function(project){
                var created = new Date(project.created);
                project.created = ("0" + created.getHours()).slice(-2) +":"+ ("0" + created.getMinutes()).slice(-2)+":"+("0" + created.getSeconds()).slice(-2) + " " + ("0" + created.getDate()).slice(-2)+"/"+("0" + (created.getMonth()+1)).slice(-2)+"/"+created.getFullYear();
            });

            var actionFormatterProjects= function(value, row, index) {
                return [
                    '<a class="edit" style="margin-right: 10px;cursor:pointer;" title="Edit" data-toggle="modal" data-target="#modal-project">',
                    	'<i class="glyphicon glyphicon-edit"></i>',
                    '</a>',
                    '<a class="configurator" style="margin-right: 10px;cursor:pointer;" title="Configurador">',
                        '<i class="fa fa-cogs"></i>',
                    '</a>',
                    '<a class="generator" style="margin-right: 10px;cursor:pointer;" title="Generador">',
                        '<i class="fa fa-calendar-check-o"></i>',
                    '</a>'
                ].join('');
            }

            var columns = [
                {align: 'center', valign: 'middle', formatter:actionFormatterProjects, events:'actionEventsProjects' },
                {field: "created", title: "Creación", align: 'center', valign: 'middle', sortable: true},
                {field: "name", title: "Nombre", align: 'center', valign: 'middle', sortable: true},
                {field: "key", title: "KEY", align: 'center', valign: 'middle', sortable: true},
                {field: "description", title: "Descripción", align: 'center', valign: 'middle', sortable: true},
            ];

            $scope.bsTableProject = BootstrapTableService.createTableSimple(projects, "ProyectosTFM-Uex", columns);
        });

        window.actionEventsProjects = {'click .edit': function (e, value, row, index) {
                $scope.mode = 2;
                $scope.errores = [];
                ProjectService.getProject(row._id).then(function(response) {
                    $scope.project = response.data;
                });
            },'click .configurator': function (e, value, row, index) {
              	//Cambiar de estado
			    $state.go('configuratorManagement', {projectId:row._id});
            },'click .generator': function (e, value, row, index) {
                //Cambiar de estado
              $state.go('generatorManagement', {projectId:row._id});
          }
        };
    };

}]);
