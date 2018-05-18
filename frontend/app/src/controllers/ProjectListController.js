angular.module('tfm.uex').controller('ProjectListController',
    ['$rootScope', 'ProjectService', 'BootstrapTableService', '$state', 'TemplateService', '$ngConfirm', 'AplicationService',
        function($rootScope, ProjectService, BootstrapTableService, $state, TemplateService, $ngConfirm, AplicationService){
	var vm = this;

    vm.bsTableProject = {};
	vm.bsTableApp = {};
    vm.error = null;
    vm.project = {};
	vm.aplication = {};
    vm.mode = 1;
	vm.templates = [];
	vm.projects = [];
	vm.templateId = ""; //Plantilla seleccionada

	vm.init = function(){
        ProjectService.getProjects().then(function(response){
			vm.projects = response.data;
			vm.loadProjectList();
			vm.loadAplicationsList();
        });
		TemplateService.getTemplates().then(function(response){
			vm.templates = response.data;
			vm.templates.push({nameTemplate: "Adjuntar plantila", _id: "upload" })
		});
	};

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
					ProjectService.getProjects().then(function(response) {
						$rootScope.projects = response.data; //Actualizar proyectos del menu lateral
					});
					$ngConfirm("Proyecto creado correctamente con plantilla importada");
				});
			}else{
				ProjectService.createProject(vm.project).then(function(response) {
					vm.project =  {};
					vm.loadProjectList();
					$('#modal-project').modal('hide');
					ProjectService.getProjects().then(function(response) {
						$rootScope.projects = response.data; //Actualizar proyectos del menu lateral
					});
					$ngConfirm("Proyecto creado correctamente");
				});
			}
		}
    }

    function validate(){
		vm.error = null;
        if(vm.project.name == undefined || vm.project.name == "")
			vm.error = "El campo nombre de proyecto es obligatorio";
		else if(vm.project.key == undefined || vm.project.key == "")
			vm.error = "El campo nombre de proyecto es obligatorio";
		else if(vm.project.description == undefined || vm.project.description == "")
			vm.error = "El campo nombre de proyecto es obligatorio";
		return vm.error != null ? false : true;
    }

    vm.updateProject = function() {
        if(validate()){
            ProjectService.updateProject(vm.project).then(function(alarm, status) {
                vm.loadProjectList();
                $('#modal-project').modal('hide');
                //Actualizamos el menu lateral
                $http.get('/api/projects').then(function(response) {
                    $rootScope.projects = response.data;
                });
            });
        }
    };


	vm.loadProjectList = function(){
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

            var columns = [
                {align: 'center', valign: 'middle', formatter:actionFormatterProjects, events:'actionEventsProjects' },
                {field: "created", title: "Creación", align: 'center', valign: 'middle', sortable: true},
                {field: "name", title: "Proyecto", align: 'center', valign: 'middle', sortable: true},
				{field: "name", title: "Aplicación", align: 'center', valign: 'middle', sortable: true},
                {field: "key", title: "KEY", align: 'center', valign: 'middle', sortable: true},
                {field: "description", title: "Descripción", align: 'center', valign: 'middle', sortable: true},
            ];

            vm.bsTableProject = BootstrapTableService.createTableSimple(projects, "ProyectosTFM-Uex", columns);
        });

        window.actionEventsProjects = {'click .edit': function (e, value, row, index) {
			vm.mode = 2;
			vm.errores = [];
                ProjectService.getProject(row._id).then(function(response) {
                    vm.project = response.data;
                });
            },'click .configurator': function (e, value, row, index) {
              	//Cambiar de estado
			    $state.go('configuratorManagement', {projectId:row._id});
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
                   					for(var i = vm.bsTableProject.options.data.length; i--;){
										if(vm.bsTableProject.options.data[i]._id == row._id){
											vm.bsTableProject.options.data.splice(i, 1);
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


			},'click .generator': function (e, value, row, index) {
                //Cambiar de estado
              $state.go('generatorManagement', {projectId:row._id});
          }
        };
	};



//*************************************************************************/
//***********************************APLICATION****************************/
//*************************************************************************/
	vm.loadAplicationsList = function(){
		AplicationService.readAllAplications().then(function(response) {
			var apps = response.data;
			console.log(apps)
			var projectsFilter = [];
			vm.projects.forEach(function(project){
				projectsFilter.push(project.name)
			});

			var actionFormatterProjects= function(value, row, index) {
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

			var columns = [
				{align: 'center', valign: 'middle', formatter:actionFormatterProjects, events:'actionEventsProjects' },
				{field: "created", title: "Creación", align: 'center', valign: 'middle', sortable: true},
				{field: "project.name", title: "Proyecto", filter: {type: "select", data: projectsFilter}, align: 'center', valign: 'middle', sortable: true},
				{field: "name", title: "Aplicación", align: 'center', valign: 'middle', sortable: true},
				{field: "description", title: "Descripción", align: 'center', valign: 'middle', sortable: true},
			];

			vm.bsTableApp = BootstrapTableService.createTableSimple(apps, "AplicacionesTFM-Uex", columns, true);

		});
		window.actionEventsProjects = {'click .edit': function (e, value, row, index) {
			vm.mode = 2;
			vm.errores = [];
				AplicationService.readAplication(row._id).then(function(response) {
					vm.aplication = response.data;
				});
			},'click .configurator': function (e, value, row, index) {
				//Cambiar de estado
				$state.go('configuratorManagement', {projectId:row._id});
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
									for(var i = vm.bsTableProject.options.data.length; i--;){
										if(vm.bsTableApp.options.data[i]._id == row._id){
											vm.bsTableApp.options.data.splice(i, 1);
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
			$state.go('generatorManagement', {projectId:row._id});
		}
		};
	}

	vm.createAplication = function (){
		AplicationService.createAplication(vm.aplication).then(function(response){
			vm.loadAplicationsList();
			$('#modal-app').modal('hide');
			$ngConfirm("Aplicación creada correctamente");
        });
	}

	vm.updateAplication = function (){
		AplicationService.updateAplication(vm.aplication).then(function(response){
			$('#modal-app').modal('hide');
			$ngConfirm("Aplicación creada correctamente");
        });
	}

	function validateAplication(){
		vm.error = null;
        if(vm.aplication.name == undefined || vm.aplication.name == "")
			vm.error = "El campo nombre de la aplicacion es obligatorio";

		return vm.error == null ? true : false;
	}


}]);
