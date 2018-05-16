angular.module('tfm.uex').controller('GeneratorManagementController',
    ['$stateParams', 'ProjectService', 'projectData', '$ngConfirm', 'TopicService', 'MediatoryService',
        function($stateParams, ProjectService, projectData, $ngConfirm, TopicService, MediatoryService){
	var gm = this;

    gm.tab = 0; //Tab que se mostrara en la vista
    gm.topics = [];
	gm.project = projectData.data;
    gm.topicId = ""; //Pestana de topic seleccionada
	gm.apps = [];
	gm.projects = [];
	gm.listRequirement = []; //Lista de requisitos marcadas en el cuestionario
	gm.listRequirementExport = []; //Lista de requisitos que se van a exportar
	gm.listRequirementTaskManager = []; //Lista de requisitos que se han exportado

	gm.newProject = false; // Partir de un proyecto existente en jira/redmine o generar uno nuevo
	gm.projectIdTaskManager = ""; //Identificador del proyecto seleccionado en redmine/jira

 	gm.deleteRequirement = function(requirementId){
		console.log("entra del")

		gm.listRequirement.forEach(function(requirement){
			for(let i = 0; i < gm.listRequirement.length; i++){
				if(gm.listRequirement[i]._id == requirementId){
					gm.listRequirement.splice(i, 1);
				}
			}
		});
	}


	gm.addRequirement = function(requirementId){
		console.log("entra add")
	}

	gm.refreshListRequirementExport = function(){
		gm.topics.forEach(function(topic){
			topic.questions.forEach(function(question){
				if(question.radio){
					question.answers.forEach(function(answer){
						//Eliminamos la opcion si ya se habia seleccionado previamente
						gm.listRequirement.forEach(function(item, index){
							if(item.id == question._id && question.radio == answer._id){
								gm.listRequirement.splice(index, 1);
							}
						});

						if(question.radio == answer._id){
							gm.listRequirement.push({id: question._id, description: answer.description, title: answer.requirement})
						}
					});
				}
			});
		});
	}

    TopicService.getTopics($stateParams.projectId).then(function(response) {
        gm.topics = response.data;
    }).catch(function(response){
		$ngConfirm(response.data.error);
	});

    gm.setTab = function(newTab){
		var validate = true;
		//Validacion para ver si puede cambiar de pagina
		if((newTab - 1) < gm.topics.length){  // Es una vista de un cuestionario
			gm.topics[(newTab - 1)].questions.forEach(function(question){
				if(question.answers.length > 0) // Si tiene respuestas
					if(question.radio == undefined || question.radio == null || question.radio == "")
						validate = false;
			});
		}else if(gm.topics.length + 2 == newTab){ // Vista detalle
			if(gm.newProject == false && gm.export.project == undefined){
				validate = false
			}else if(gm.newProject == false){ //Cargar las incidencias del proyecto
				MediatoryService.getIssues(gm.export).then(function(response) {
					gm.listRequirementTaskManager = response.data;
				});
			}
		}

		if(validate)
			gm.tab = newTab;
		else
			$ngConfirm("Debes rellenar correctamente la vista actual");
    };

    gm.isSet = function(tabNum){
        return gm.tab === tabNum;
	};

	gm.exportsIssues = function(){
		if(gm.listRequirementExport.length > 0){
			MediatoryService.createIssues(gm.export, gm.listRequirementExport).then(function(response){
				MediatoryService.getIssues(gm.export).then(function(response) {
					gm.listRequirementTaskManager = response.data;
				});
				$ngConfirm("Las tareas se ha exportado correctamente");
			}).catch(function(response){
				$ngConfirm(response.data.error)
			});
		}else{
			$ngConfirm("Debes indicar al menos una tarea a exportar")
		}
	}


	gm.init = function(){
        TopicService.getTopics($stateParams.projectId).then(function(response) {
			gm.topics = response.data;
			if(gm.topics.length > 0)
				gm.topicId = gm.topics[0]._id;
		});

		MediatoryService.getApps().then(function(response){
			gm.apps = response.data;
		}).catch(function(response){
			$ngConfirm(response.data.error);
		});
	}

	gm.checkComunication = function(){
		if(validateServidor()){
			MediatoryService.checkComunication(gm.export).then(function(response){
				gm.setTab(gm.topics.length + 1);
				gm.getProjects();
				$ngConfirm("La conexión se ha podido establecer correctamente")
			}).catch(function(response){
				$ngConfirm(response.data.error)
			});;
		}else
			$ngConfirm(gm.error)
	}

	gm.createProject = function(){
		if(validateProject()){
			MediatoryService.createProject(gm.export, gm.projectExport).then(function(response){
				gm.setTab(gm.topics.length + 2);
				$ngConfirm("El proyecto se ha exportado correctamente");
				var project = response.data;
				gm.projectIdTaskManager = project.id;
			}).catch(function(response){
				$ngConfirm(response.data.error)
			});
		}else
			$ngConfirm(gm.error)
	}

	function validateProject(){
		gm.error = null;
		if(gm.projectExport == undefined)
			gm.error = "Se debe especificar los campos";
        else if((gm.projectExport.name == undefined || gm.projectExport.name == ""))
			gm.error = "Se debe especificar el nombre del proyecto";
        else if((gm.projectExport.key == undefined || gm.projectExport.key == ""))
			gm.error = "Se debe indicar la clave del proyecto";
		else if((gm.projectExport.description == undefined || gm.projectExport.description == ""))
			gm.error = "Se debe indicar la descripción del proyecto";

		return gm.error == null ? true : false;

	}
	// Llamarlo impor
	gm.getProjects = function(){
		MediatoryService.getProjects(gm.export).then(function(response){
			gm.projects = response.data;
		}).catch(function(response){
			$ngConfirm(response.data.error);
		});
	}

	function validateServidor(){
		gm.error = null;
		if(gm.export == undefined)
			gm.error = "Se debe especificar la aplicación seleccionada";
        else if((gm.export.app == undefined || gm.export.app == ""))
			gm.error = "Se debe especificar la aplicación seleccionada";
        else if((gm.export.ip == undefined || gm.export.ip == ""))
			gm.error = "Se debe indicar la dirección IP del servidor";
		else if(!validateIPaddress(gm.export.ip))
			gm.error = "La dirección IP no tiene un formato válido";
		else if((gm.export.port == undefined || gm.export.port == ""))
			gm.error = "Se debe indicar el puerto del servidor";

		if(gm.error == null){
			gm.apps.forEach(function(app){
				if(app.id == gm.export.app){
					app.authentication.forEach(function(field){
						if(gm.export[field.id] == undefined || gm.export[field.id] == "")
							gm.error = "Se debe especificar el campo " + field.name;

					});
				}

			});
		}
		return gm.error == null ? true : false;
	}

	function validateIPaddress(ipaddress){
		var expIp= /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
 		if (expIp.test(ipaddress))
    		return true;
		return false;
	}

	gm.validateTopic = function(){
		$ngConfirm("Debes indicar la respuesta de todas las preguntas")
	}

}]);
