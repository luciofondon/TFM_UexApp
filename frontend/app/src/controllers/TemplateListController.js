angular.module('tfm.uex').controller('TemplateListController',
	['$rootScope', '$http', 'BootstrapTableService', 'TemplateService', '$state', '$ngConfirm', '$window',
		function($rootScope, $http, BootstrapTableService, TemplateService, $state, $ngConfirm, $window){

	var tl = this;

    tl.bsTableTemplate = {};
    tl.alerts = [];
    tl.errores = [];
    tl.mode = 1;

	tl.init = function(){
		tl.loadProjectList();
	};

	tl.loadProjectList = function(){
        TemplateService.readAllTemplates().then(function(response) {
			var templates = response.data;
            templates.forEach(function(template){
                var created = new Date(template.created);
                template.created = ("0" + created.getHours()).slice(-2) +":"+ ("0" + created.getMinutes()).slice(-2)+":"+("0" + created.getSeconds()).slice(-2) + " " + ("0" + created.getDate()).slice(-2)+"/"+("0" + (created.getMonth()+1)).slice(-2)+"/"+created.getFullYear();
            });

            var actionFormatterProjects= function(value, row, index) {
                return [
  					'<a class="download" disabled style="margin-right: 10px;cursor:pointer;" title="Ver" data-toggle="modal" data-target="#modal-project">',
                    	'<i class="glyphicon glyphicon-download-alt"></i>',
					'</a>',
                    '<a class="view" disabled style="margin-right: 10px;cursor:pointer;" title="Ver" data-toggle="modal" data-target="#modal-project">',
                    	'<i class="glyphicon glyphicon-search"></i>',
					'</a>',
					'<a class="remove" style="margin-right: 10px;" href="javascript:void(0)" title="Eliminar">',
						'<i class="glyphicon glyphicon-remove"></i>',
					'</a>'
                ].join('');
            }

			var columns= [
				{align: 'center', valign: 'middle', formatter:actionFormatterProjects, events:'actionEventsProjects' },
				{field: "created", title: "Creación", align: 'center', valign: 'middle', sortable: true},
				{field: "nameTemplate", title: "Plantilla", align: 'center', valign: 'middle', sortable: true},
				{field: "name", title: "Proyecto", align: 'center', valign: 'middle', sortable: true},
				{field: "description", title: "Descripción", align: 'center', valign: 'middle', sortable: true},
			];

			tl.bsTableTemplate = BootstrapTableService.createTableSimple(templates, "PlantillaTFM-Uex", columns);

        });

        window.actionEventsProjects = {'click .remove': function (e, value, row, index) {
				$ngConfirm({
					title: 'Plantilla',
					content: '¿Deseas eliminar la plantilla?',
					buttons: {
						aceptar: {
							text: 'Eliminar',
							btnClass: 'btn-blue',
							action: function(scope, button){
								TemplateService.deleteTemplate(row._id).then(function(response) {
									for(var i = tl.bsTableTemplate.options.data.length; i--;){
										if(tl.bsTableTemplate.options.data[i]._id == row._id){
											tl.bsTableTemplate.options.data.splice(i, 1);
											$ngConfirm('La plantilla ha sido eliminado correctamente');
										}
									}
								});
							}
						},
						cerrar: {
							text: 'Cancelar',
							btnClass: 'btn-orange',
						}
					}
				});
			},'click .view': function (e, value, row, index) {
				//Cambiar de estado
				$state.go('templateDetail', {templateId: row._id});
		  	},'click .download': function (e, value, row, index) {
				TemplateService.generateTemplateXML(row._id).then(function(response) {
					window.location = '/download/file/' + response.data.nameFile;
				});

		  	}
		};
    };
}]);
