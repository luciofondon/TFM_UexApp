
angular.module('tfm.uex').controller('UserListController',
    ['UserService', 'RolService', 'ProjectService', 'BootstrapTableService', '$ngConfirm', '$scope', 'UploadService',
        function(UserService, RolService, ProjectService, BootstrapTableService, $ngConfirm, $scope, UploadService){
	var ul = this;
	ul.mode = 1;
	ul.user = {};
	ul.alerts = [];
    ul.error = null;
    ul.resetPassword = {};
    ul.projects = [];
    ul.bsTableUsers = {};

	ul.reset = function(){
		ul.mode = 1;
		ul.user = {};
		ul.error = null;
		ul.alertas = [];
	}

    ul.init = function() {
        RolService.readAllRoles().then(function(response) {
            ul.roles = response.data;
        });

        ProjectService.readAllProjects().then(function(projects) {
            ul.projects = projects;
        });
    }

	ul.loadUserList = function(){
        UserService.getUsers().then(function(response) {
            var users = response.data;
            var actionFormatterUsers = function(value, row, index) {
                return [
                    '<a class="edit" style="margin-right: 10px;cursor:pointer;" title="Editar" data-toggle="modal" data-target="#modal-user">',
                        '<i class="glyphicon glyphicon-edit"></i>',
                    '</a>',
                    '<a class="password" style="margin-right: 10px;cursor:pointer;" title="Modificar contraseña" data-toggle="modal" data-target="#modal-password">',
                        '<i class="glyphicon glyphicon-lock"></i>',
                    '</a>',
                    '<a class="remove" style="margin-right: 10px;" href="javascript:void(0)" title="Eliminar">',
                        '<i class="glyphicon glyphicon-remove"></i>',
                    '</a>'
                ].join('');
            }

            var columns = [
                {align: 'center', width:'100px', valign: 'middle', formatter:actionFormatterUsers, events:'actionEventsUsers'},
                {field: "createdFormat", title: "Creacion", align: 'center', valign: 'middle', sortable: true},
                {field: "name", title: "Nombre", align: 'center', valign: 'middle', sortable: true},
                {field: "lastName", title: "Apellidos", align: 'center', valign: 'middle', sortable: true},
                {field: "userName", title: "Usuario", align: 'center', valign: 'middle', sortable: true},
                {field: "email", title: "Email", align: 'center', valign: 'middle', sortable: true},
                {field: "rol.name", title: "Rol", align: 'center', valign: 'middle', sortable: true},
                {field: "phone", title: "Telefono", align: 'center', valign: 'middle', sortable: true},
                {field: "projectsFormat", title: "Proyectos", align: 'center', valign: 'middle', sortable: true, visible:false},
                {field: "municipiosFormat", title: "Municipios", align: 'center', valign: 'middle', sortable: true, visible:false}
            ];

            ul.bsTableUsers = BootstrapTableService.createTableSimple(users, "UsuariosTFM-Uex", columns);

            window.actionEventsUsers = {'click .edit': function (e, value, row, index) {
				ul.error = null;
				ul.user = row;
				ul.mode = 2;
				$scope.$apply();

                },'click .remove': function (e, value, row, index) {
					$ngConfirm({
						title: 'Usuario',
						content: '¿Deseas eliminar el usuario?',
						buttons: {
							aceptar: {
								text: 'Eliminar',
								btnClass: 'btn-blue',
								action: function(scope, button){
									UserService.removeUser(row._id).then(function(user) {
										for(var i = ul.bsTableUsers.options.data.length; i--;){
											if(ul.bsTableUsers.options.data[i]._id == row._id){
												ul.bsTableUsers.options.data.splice(i, 1);
												$ngConfirm('El usuario ha sido eliminado correctamente');
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
                },'click .password': function (e, value, row, index) {
                    ul.user = row;
                    ul.resetPassword = {};
                    $scope.$apply();
                }
            };
        });
    }

    ul.resetPasswordUser = function() {
        ul.alerts = [];
        if(validatePassword()){
            UserService.resetPassword(ul.user._id, ul.resetPassword).then(function() {
				$ngConfirm("La contraseña ha sido actualizada correctamente");
                $('#modal-password').modal('hide');
            }).catch(function(data) {
                $ngConfirm(data);
            });
        }
    }

    function validatePassword(){
		ul.error = null;
        if((ul.resetPassword.password == undefined || ul.resetPassword.password == ""))
			ul.error = "Se debe especificar una contraseña";
        else if((ul.resetPassword.confirmPassword == undefined || ul.resetPassword.confirmPassword == ""))
			ul.error = "Se debe completar el campo repetir contraseña";
        else if((ul.resetPassword.password != ul.resetPassword.confirmPassword))
			ul.error = "Las dos contraseñas especificadas no coinciden";

		return ul.error == null ? true : false;
	}

    function validateUser(){
		ul.error = null;
        var patronEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

        if(ul.user.email == undefined || ul.user.email == "")
			ul.error ="Se debe indicar un email";
        else if(ul.user.email.search(patronEmail) != 0)
			ul.error ="Debe introducirse un email válido";
        else if(ul.user.name == undefined || ul.user.name == "")
			ul.error ="Se debe indicar un nombre para el usuario";
        else if(ul.user.userName == undefined || ul.user.userName == "")
			ul.error ="Se debe indicar un nombre de usuario";
        else if((ul.user.phoneNumber != undefined && ul.user.phoneNumber != "") && (ul.user.phoneNumber.length < 9 || !Number.isInteger(parseInt(ul.user.phone))))
			ul.error ="El teléfono facilitado no es válido";
        else if((ul.user.password == undefined || ul.user.password == "") && ul.mode == 1)
			ul.error ="Se debe especificar una contraseña";
        else if((ul.user.confirmPassword == undefined || ul.user.confirmPassword == "") && ul.mode == 1)
			ul.error ="Se debe completar el campo repetir contraseña";
        else if((ul.user.password != ul.user.confirmPassword) && ul.mode == 1)
			ul.error ="Las dos contraseñas especificadas no coinciden";

		return ul.error == null ? true : false;
    }

    ul.createUser = function() {
		debugger
		if(validateUser()){
			upload(function(status, nameImage){
				if(status == 200 && nameImage != undefined)
					ul.user.image = nameImage;

				UserService.createUser(ul.user).then(function(project) {
					ul.imageUpload = "";
					ul.user = {};
					ul.loadUserList();
					$ngConfirm("Usuario creado correctamente");
					$('#modal-user').modal('hide');
				});

			});
        }
    }

    ul.updateUser = function() {
        if(validateUser()){
            UserService.updateUser(ul.user).then(function(){
                ul.loadUserList();
				$ngConfirm("Usuario actualizado correctamente");
                $('#modal-user').modal('hide')
            });
        }
    }

	function upload(callback){
		if(ul.imageUpload != undefined){
            UploadService.uploadImage(ul.imageUpload).then(function(response){
                callback(200, response.data.name);
            }).catch(function(err){
                callback(500, err);
            });
        }else
            callback(200, "");
    }

}]);

