angular.module('tfm.uex').controller('ProjectListController',
    ['$rootScope', 'ProjectService', 'BootstrapTableService', '$state', 'TemplateService', '$ngConfirm', 'AplicationService', 'UploadService',
        function($rootScope, ProjectService, BootstrapTableService, $state, TemplateService, $ngConfirm, AplicationService, UploadService){
	var pl = this;
    pl.bsTableProject = {};
	pl.bsTableApp = {};
    pl.error = null;
    pl.project = {};
	pl.aplication = {};
    pl.mode = 1;
	pl.templates = [];
	pl.projects = [];
	pl.templateId = ""; //Plantilla seleccionada

	pl.init = function(){
        ProjectService.readAllProjects().then(function(response){
			pl.projects = response.data;
			pl.loadProjectList();
			pl.loadAplicationsList();
        });
		TemplateService.readAllTemplates().then(function(response){
			pl.templates = response.data;
			pl.templates.push({nameTemplate: "Adjuntar plantila", _id: "upload" })
		});
	};

<<<<<<< HEAD
    pl.createProject = function (){
        if(validateProject()){
			ProjectService.createProject(pl.project).then(function(response) {
				pl.project =  {};
				pl.loadProjectList();
				$('#modal-project').modal('hide');
				ProjectService.readAllProjects().then(function(response) {
					$rootScope.projects = response.data; //Actualizar proyectos del menu lateral
=======
    vm.createProject = function (){
        if(validate()){
			if(vm.templateId == 'upload'){
				UploadService.uploadXML(vm.templateUpload).then(function(response){
					vm.project.templateUpload = response.name;
				});
			}else if(vm.templateId != "" && vm.templateId != undefined && vm.templateId.length > 0){
				ProjectService.generateProject(vm.templateId, vm.project).then(function(response) {
					vm.templateId = "";
					vm.project =  {};
					vm.loadProjectList();
					$('#modal-project').modal('hide');
					ProjectService.readAllProjects().then(function(response) {
						$rootScope.projects = response.data; //Actualizar proyectos del menu lateral
					});
					$ngConfirm("Proyecto creado correctamente con plantilla importada");
				});
			}else{
				ProjectService.createProject(vm.project).then(function(response) {
					vm.project =  {};
					vm.loadProjectList();
					$('#modal-project').modal('hide');
					ProjectService.readAllProjects().then(function(response) {
						$rootScope.projects = response.data; //Actualizar proyectos del menu lateral
						vm.projects = response.data;
					});
					$ngConfirm("Proyecto creado correctamente");
>>>>>>> effc82b2ade007cd6c4ef069e7cb91e507db9ab5
				});
				$ngConfirm("Proyecto creado correctamente");
			});
		}
	}
	
	pl.updateProject = function() {
        if(validateProject()){
            ProjectService.updateProject(pl.project).then(function(response, status) {
                pl.loadProjectList();
                $('#modal-project').modal('hide');
				//Actualizamos el menu lateral
				ProjectService.readAllProjects().then(function(response, status) {
                    $rootScope.projects = response.data;
                });
            });
        }
    };

    function validateProject(){
		pl.error = null;
        if(pl.project.name == undefined || pl.project.name == "")
			pl.error = "El campo nombre de proyecto es obligatorio";
		else if(pl.project.key == undefined || pl.project.key == "")
			pl.error = "El campo nombre de proyecto es obligatorio";
		else if(pl.project.description == undefined || pl.project.description == "")
			pl.error = "El campo nombre de proyecto es obligatorio";
		return pl.error != null ? false : true;
    }

	pl.loadProjectList = function(){
        ProjectService.readAllProjects().then(function(response) {

            var projects = response.data;
            projects.forEach(function(project){
                var created = new Date(project.created);
                project.created = ("0" + created.getHours()).slice(-2) +":"+ ("0" + created.getMinutes()).slice(-2)+":"+("0" + created.getSeconds()).slice(-2) + " " + ("0" + created.getDate()).slice(-2)+"/"+("0" + (created.getMonth()+1)).slice(-2)+"/"+created.getFullYear();
            });

            var actionFormatterProjects= function(value, row, index) {
                return [
                    '<a class="edit" style="margin-right: 10px;cursor:pointer;" title="Editar" data-toggle="modal" data-target="#modal-project">',
                    	'<i class="glyphicon glyphicon-edit"></i>',
                    '</a>',
					'<a class="remove" style="margin-right: 10px;" href="javascript:void(0)" title="Eliminar">',
                        '<i class="glyphicon glyphicon-remove"></i>',
                    '</a>'
                ].join('');
            }

            var columns = [
                {align: 'center', valign: 'middle', formatter:actionFormatterProjects, events:'actionEventsProjects' },
                {field: "created", title: "Creación", align: 'center', valign: 'middle', sortable: true},
                {field: "name", title: "Proyecto", align: 'center', valign: 'middle', sortable: true},
                {field: "key", title: "KEY", align: 'center', valign: 'middle', sortable: true},
                {field: "description", title: "Descripción", align: 'center', valign: 'middle', sortable: true},
            ];

            pl.bsTableProject = BootstrapTableService.createTableSimple(projects, "ProyectosTFM-Uex", columns);
        });

        window.actionEventsProjects = {'click .edit': function (e, value, row, index) {
			console.log("entra")
				pl.mode = 2;
				pl.errores = [];
                ProjectService.readProject(row._id).then(function(response) {
                    pl.project = response.data;
                });
           },'click .remove': function (e, value, row, index) {
				$ngConfirm({
					title: 'Proyecto',
					content: '¿Deseas eliminar el proyecto?',
					buttons: {
						aceptar: {
							text: 'Eliminar',
							btnClass: 'btn-blue',
							action: function(scope, button){
								ProjectService.deleteProject(row._id).then(function(response) {
                   					for(var i = pl.bsTableProject.options.data.length; i--;){
										if(pl.bsTableProject.options.data[i]._id == row._id){
											pl.bsTableProject.options.data.splice(i, 1);
											$ngConfirm('El proyecto se ha sido eliminado correctamente');
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
			}
        };
	};

//*************************************************************************/
//***********************************APLICATION****************************/
//*************************************************************************/
	pl.loadAplicationsList = function(){
		AplicationService.readAllAplications().then(function(response) {
			var apps = response.data;

			var actionFormatterAplications= function(value, row, index) {
				return [
					'<a class="edit" style="margin-right: 10px;cursor:pointer;" title="Edit" data-toggle="modal" data-target="#modal-app">',
						'<i class="glyphicon glyphicon-edit"></i>',
					'</a>',
					'<a class="remove" style="margin-right: 10px;" href="javascript:void(0)" title="Eliminar">',
						'<i class="glyphicon glyphicon-remove"></i>',
					'</a>',
					'<a class="configurator" style="margin-right: 10px;cursor:pointer;" title="Configurador">',
						'<i class="fa fa-cogs"></i>',
					'</a>',
					'<a class="generator" style="margin-right: 10px;cursor:pointer;" title="Generador">',
						'<i class="fa fa-calendar-check-o"></i>',
					'</a>'
				].join('');
			}
			var projectsFilter = [];
			pl.projects.forEach(function(project){
				projectsFilter.push(project.name)
			});

			var columns = [
				{align: 'center', valign: 'middle', formatter: actionFormatterAplications, events:'actionEventsAplication' },
				{field: "created", title: "Creación", align: 'center', valign: 'middle', sortable: true},
				{field: "project.name", title: "Proyecto", filter: {type: "select", data: projectsFilter}, align: 'center', valign: 'middle', sortable: true},
				{field: "name", title: "Aplicación", align: 'center', valign: 'middle', sortable: true},
				{field: "description", title: "Descripción", align: 'center', valign: 'middle', sortable: true},
			];

			pl.bsTableApp = BootstrapTableService.createTableSimple(apps, "AplicacionesTFM-Uex", columns, true);

		});
		window.actionEventsAplication = {'click .edit': function (e, value, row, index) {
			pl.mode = 2;
			pl.errores = [];
				AplicationService.readAplication(row._id).then(function(response) {
					pl.aplication = response.data;
				});
			},'click .configurator': function (e, value, row, index) {
				//Cambiar de estado
				$state.go('configuratorManagement', {aplicationId:row._id});
			},'click .remove': function (e, value, row, index) {
				$ngConfirm({
					title: 'Aplicación',
					content: '¿Deseas eliminar la aplicación del proyecto?',
					buttons: {
						aceptar: {
							text: 'Eliminar',
							btnClass: 'btn-blue',
							action: function(scope, button){
								AplicationService.deleteAplication(row._id).then(function(response) {
<<<<<<< HEAD
									for(var i = pl.bsTableProject.options.data.length; i--;){
										if(pl.bsTableApp.options.data[i]._id == row._id){
											pl.bsTableApp.options.data.splice(i, 1);
=======
									for(var i = vm.bsTableApp.options.data.length; i--;){
										if(vm.bsTableApp.options.data[i]._id == row._id){
											vm.bsTableApp.options.data.splice(i, 1);
>>>>>>> effc82b2ade007cd6c4ef069e7cb91e507db9ab5
											$ngConfirm('La aplicación se ha sido eliminado correctamente');
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


			},'click .generator': function (e, value, row, index) {
				//Cambiar de estado
				$state.go('generatorManagement', {aplicationId: row._id});
			}
		};
	}

	pl.createAplication = function (){
		/*UploadService.uploadXML(pl.templateUpload).then(function (response) {
			console.log("subido ok")
		});*/
		if(validateAplication()){
			if(pl.templateId == 'upload'){
				UploadService.uploadXML(pl.templateUpload).then(function(response){
					pl.project.templateUpload = response.name;
				});
			}else if(pl.templateId != "" && pl.templateId != undefined && pl.templateId.length > 0){
				AplicationService.generateAplication(pl.templateId, pl.template).then(function(response) {
					pl.templateId = "";
					pl.loadAplicationsList();
					$('#modal-app').modal('hide');
					AplicationService.readAllAplications().then(function(response) {
					});
					$ngConfirm("Proyecto creado correctamente con plantilla importada");
				});
			}else{
				AplicationService.createAplication(pl.aplication).then(function(response){
					pl.aplication = {};
					pl.loadAplicationsList();
					$('#modal-app').modal('hide');
					$ngConfirm("Aplicación creada correctamente");
				});
			}
		}
	}


		/*

		if(pl.templateId == 'upload'){
				UploadService.uploadXML(pl.templateUpload).then(function(response){
					pl.project.templateUpload = response.name;
				});
			}else if(pl.templateId != "" && pl.templateId != undefined && pl.templateId.length > 0){
				ProjectService.generateProject(pl.templateId, pl.project).then(function(response) {
					pl.templateId = "";
					pl.project =  {};
					pl.loadProjectList();
					$('#modal-project').modal('hide');
					ProjectService.getProjects().then(function(response) {
						$rootScope.projects = response.data; //Actualizar proyectos del menu lateral
					});
					$ngConfirm("Proyecto creado correctamente con plantilla importada");
				});
			}else{
				ProjectService.createProject(pl.project).then(function(response) {
					pl.project =  {};
					pl.loadProjectList();
					$('#modal-project').modal('hide');
					ProjectService.getProjects().then(function(response) {
						$rootScope.projects = response.data; //Actualizar proyectos del menu lateral
					});
					$ngConfirm("Proyecto creado correctamente");
				});
			}
			*/
	}
<<<<<<< HEAD
 
	pl.updateAplication = function (){
		AplicationService.updateAplication(pl.aplication).then(function(response){
=======

	vm.updateAplication = function (){
		AplicationService.updateAplication(vm.aplication).then(function(response){
			vm.aplication = {};
			vm.loadAplicationsList();
>>>>>>> effc82b2ade007cd6c4ef069e7cb91e507db9ab5
			$('#modal-app').modal('hide');
			$ngConfirm("Aplicación creada correctamente");
        });
	}

	function validateAplication(){
		pl.error = null;
        if(pl.aplication.name == undefined || pl.aplication.name == "")
			pl.error = "El campo nombre de la aplicacion es obligatorio";
		else if(pl.aplication.description == undefined || pl.aplication.description == "")
			pl.error = "El campo descripción de la aplicacion es obligatorio";
		else if(pl.aplication.project == undefined || pl.aplication.project == "")
			pl.error = "El campo proyecto de la aplicacion es obligatorio";
		return pl.error == null ? true : false;
	}


}]);

/*

pl.createProject = function (){
        if(validate()){
			if(pl.templateId == 'upload'){
				UploadService.uploadXML(pl.templateUpload).then(function(response){
					pl.project.templateUpload = response.name;
				});
			}else if(pl.templateId != "" && pl.templateId != undefined && pl.templateId.length > 0){
				ProjectService.generateProject(pl.templateId, pl.project).then(function(response) {
					pl.templateId = "";
					pl.project =  {};
					pl.loadProjectList();
					$('#modal-project').modal('hide');
					ProjectService.readAllProjects().then(function(response) {
						$rootScope.projects = response.data; //Actualizar proyectos del menu lateral
					});
					$ngConfirm("Proyecto creado correctamente con plantilla importada");
				});
			}else{
				ProjectService.createProject(pl.project).then(function(response) {
					pl.project =  {};
					pl.loadProjectList();
					$('#modal-project').modal('hide');
					ProjectService.readAllProjects().then(function(response) {
						$rootScope.projects = response.data; //Actualizar proyectos del menu lateral
					});
					$ngConfirm("Proyecto creado correctamente");
				});
			}
		}
	}
	
	*/
