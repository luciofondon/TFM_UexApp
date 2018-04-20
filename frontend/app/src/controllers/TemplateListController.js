angular.module('tfm.uex').controller('TemplateListController',
	['$rootScope', '$http', 'BootstrapTableService', 'TemplateService',
		function($rootScope, $http, BootstrapTableService, TemplateService){

	var vm = this;

    vm.bsTableTemplate = {};
    vm.alerts = [];
    vm.errores = [];
    vm.mode = 1;

	vm.init = function(){
		vm.loadProjectList();
	};

	vm.loadProjectList = function(){
        TemplateService.getTemplates().then(function(response) {
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

			var columns= [
				{align: 'center', valign: 'middle', formatter:actionFormatterProjects, events:'actionEventsProjects' },
				{field: "created", title: "Creación", align: 'center', valign: 'middle', sortable: true},
				{field: "nameTemplate", title: "Plantilla", align: 'center', valign: 'middle', sortable: true},
				{field: "name", title: "Proyecto", align: 'center', valign: 'middle', sortable: true},
				{field: "key", title: "KEY", align: 'center', valign: 'middle', sortable: true},
				{field: "description", title: "Descripción", align: 'center', valign: 'middle', sortable: true},
			];

			vm.bsTableTemplate = BootstrapTableService.createTableSimple(templates, "PlantillaTFM-Uex", columns);

        });

        window.actionEventsProjects = {'click .edit': function (e, value, row, index) {
            vm.mode = 2;
            vm.errores = [];
            $http.get('/api/project/' + row._id).then(function(response) {
                vm.project = response.data;
            });
        }};
    };

}]);
