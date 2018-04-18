angular.module('tfm.uex').controller('TemplateListController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){

    $scope.bsTableTemplate = {};
    $scope.alerts = [];
    $scope.errores = [];
    $scope.mode = 1;

	$scope.init = function(){

		$scope.loadProjectList();
	};


	$scope.loadProjectList = function(){
        $http.get('/api/templates').then(function(response) {
			var templates = response.data;
            templates.forEach(function(template){
                var created = new Date(template.created);
                template.created = ("0" + created.getHours()).slice(-2) +":"+ ("0" + created.getMinutes()).slice(-2)+":"+("0" + created.getSeconds()).slice(-2) + " " + ("0" + created.getDate()).slice(-2)+"/"+("0" + (created.getMonth()+1)).slice(-2)+"/"+created.getFullYear();
            });

            var actionFormatterProjects= function(value, row, index) {
                return [
                    '<a class="edit" disabled style="margin-right: 10px;cursor:pointer;" title="Ver" data-toggle="modal" data-target="#modal-project">',
                    	'<i class="glyphicon glyphicon-search"></i>',
                    '</a>'
                ].join('');
            }

            $scope.bsTableTemplate = {
                options: {
                    data: templates,
                    exportDataType: "all",
                    exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'],
                    exportOptions:{
                        fileName: "PPlantillasTFM-Uex",
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
            $http.get('/api/project/' + row._id).then(function(response) {
                $scope.project = response.data;
            });
        }};
    };


}]);
