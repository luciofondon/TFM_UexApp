angular.module('tfm.uex').controller('ProjectListController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){

    $scope.bsTableProject = {};
    $scope.alerts = [];
    $scope.errores = [];
    $scope.project = {};
    $scope.mode = 1;
	$scope.templates = [];


	$scope.init = function(){
		console.log("Entra")
		$http.get('/api/templates').then(function(response) {
            $scope.templates = response.data;
        });
	};


    $scope.createProject = function (){
        if(validate()){
            $http.post('/api/projects', $scope.project).success(function(project) {
                $scope.project =  {};
                $scope.loadProjectList();
                $scope.alerts = [];
                $scope.alerts.push("Proyecto creado correctamente.")
                $('#modal-project').modal('hide');
                $http.get('/api/projects').success(function(projects) {
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
        else
            return true;
    }


    $scope.updateProject = function() {
        if(validate()){
            $http.put('/api/project/' +  $scope.project._id, $scope.project).success(function(alarm, status) {
                $scope.loadProjectList();
                $('#modal-project').modal('hide');
                //Actualizamos el menu lateral
                $http.get('/api/projects').success(function(projects) {
                    $rootScope.projects = projects;
                });
            });
        }
    };

	$scope.loadProjectList = function(){
        $http.get('/api/projects').success(function(projects) {
            projects.forEach(function(project){
                var created = new Date(project.created);
                project.created = ("0" + created.getHours()).slice(-2) +":"+ ("0" + created.getMinutes()).slice(-2)+":"+("0" + created.getSeconds()).slice(-2) + " " + ("0" + created.getDate()).slice(-2)+"/"+("0" + (created.getMonth()+1)).slice(-2)+"/"+created.getFullYear();
            });

            var actionFormatterProjects= function(value, row, index) {
                return [
                    '<a class="edit" style="margin-right: 10px;cursor:pointer;" title="Edit" data-toggle="modal" data-target="#modal-project">',
                    	'<i class="glyphicon glyphicon-edit"></i>',
                    '</a>'
                ].join('');
            }

            $scope.bsTableProject = {
                options: {
                    data: projects,
                    toolbar:"#crear",
                    exportDataType: "all",
                    exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'],
                    exportOptions:{
                        fileName: "ProyectosTFM-Uex",
                        ignoreColumn:[0],
                        type:'pdf',
                        jspdf: {
                            orientation: 'l',
                            format: 'a3',
                            margins: {left:10, right:10, top:20, bottom:20},
                            autotable: {tableWidth: 'wrap'}
                        }
                    },
                    striped: true,
                    showToggle: true,
                    showExport: true,
                    pagination: true,
                    pageSize: 15,
                    pageList: [5, 10, 15, 25, 50, 100],
                    search: true,
                    showColumns: true,
                    minimumCountColumns: 1,
                    clickToSelect: false,
                    maintainSelected: true,
                    mobileResponsive: true,
                    columns: [
                        {align: 'center', valign: 'middle', formatter:actionFormatterProjects, events:'actionEventsProjects' },
                        {field: "created", title: "Creación", align: 'center', valign: 'middle', sortable: true},
                        {field: "name", title: "Nombre", align: 'center', valign: 'middle', sortable: true},
                        {field: "key", title: "KEY", align: 'center', valign: 'middle', sortable: true},
                        {field: "description", title: "Descripción", align: 'center', valign: 'middle', sortable: true},
                    ]
                }
            };
        })

        window.actionEventsProjects = {'click .edit': function (e, value, row, index) {
            $scope.mode = 2;
            $scope.errores = [];
            $http.get('/api/project/' + row._id).success(function(project, status) {
                $scope.project = project;
            });
        }};
    };


}]);
