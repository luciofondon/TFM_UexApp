
angular.module('tfm.uex').controller('UserListController',
    ['UserService', 'RolService', 'ProjectService', 'BootstrapTableService', '$ngConfirm', '$scope',
        function(UserService, RolService, ProjectService, BootstrapTableService, $ngConfirm, $scope){
	var vm = this;
	vm.mode = 1;
	vm.user = {};
	vm.alerts = [];
    vm.error = null;
    vm.resetPassword = {};
    vm.projects = [];
    vm.bsTableUsers = {};

	vm.reset = function(){
		vm.mode = 1;
		vm.user = {};
		vm.error = null;
		vm.alertas = [];
	}

    vm.init = function() {
        RolService.getRoles().then(function(response) {
            vm.roles = response.data;
        });

        ProjectService.getProjects().then(function(projects) {
            vm.projects = projects;
        });
    }

	vm.loadUserList = function(){
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

            vm.bsTableUsers = BootstrapTableService.createTableSimple(users, "UsuariosTFM-Uex", columns);

            window.actionEventsUsers = {'click .edit': function (e, value, row, index) {
				vm.error = null;
				vm.user = row;
				vm.mode = 2;
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
										for(var i = vm.bsTableUsers.options.data.length; i--;){
											if(vm.bsTableUsers.options.data[i]._id == row._id){
												vm.bsTableUsers.options.data.splice(i, 1);
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
                    vm.user = row;
                    vm.resetPassword = {};
                    $scope.$apply();
                }
            };
        });
    }

    vm.resetPassword = function() {
        vm.alerts = [];
        if(validatePassword()){
            UserService.resetPassword(vm.user._id, vm.resetPassword).then(function() {
				$ngConfirm("La contraseña ha sido actualizada correctamente");
                $('#modal-password').modal('hide');
            }).catch(function(data) {
                alert(data[0].msg);
            });
        }
    }

    function validatePassword(){
		vm.error = null;
        if((vm.resetPassword.password == undefined || vm.resetPassword.password == ""))
			vm.error = "Se debe especificar una contraseña";
        else if((vm.resetPassword.confirmPassword == undefined || vm.resetPassword.confirmPassword == ""))
			vm.error = "Se debe completar el campo repetir contraseña";
        else if((vm.resetPassword.password != vm.resetPassword.confirmPassword))
			vm.error = "Las dos contraseñas especificadas no coinciden";

			return $scope.error != null ? true : false;
	}

    function validateUser(){
		vm.error = null;
        var patronEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

        if(vm.user.email == undefined || vm.user.email == "")
			vm.error ="Se debe indicar un email";
        else if(vm.user.email.search(patronEmail) != 0)
			vm.error ="Debe introducirse un email válido";
        else if(vm.user.name == undefined || vm.user.name == "")
			vm.error ="Se debe indicar un nombre para el usuario";
        else if(vm.user.userName == undefined || vm.user.userName == "")
			vm.error ="Se debe indicar un nombre de usuario";
        else if((vm.user.phoneNumber != undefined && vm.user.phoneNumber != "") && (vm.user.phoneNumber.length < 9 || !Number.isInteger(parseInt(vm.user.phone))))
			vm.error ="El teléfono facilitado no es válido";
        else if((vm.user.password == undefined || vm.user.password == "") && vm.mode == 1)
			vm.error ="Se debe especificar una contraseña";
        else if((vm.user.confirmPassword == undefined || vm.user.confirmPassword == "") && vm.mode == 1)
			vm.error ="Se debe completar el campo repetir contraseña";
        else if((vm.user.password != vm.user.confirmPassword) && vm.mode == 1)
			vm.error ="Las dos contraseñas especificadas no coinciden";

		return $scope.error != null ? true : false;
    }

    vm.createUser = function() {
        if(validateUser()){
            UserService.addUser(vm.user).then(function(project) {
                vm.user = {};
                vm.loadUserList();
                vm.alerts = [];
                vm.alertas.push("Usuario creado correctamente");
                $('#modal-user').modal('hide');
            });
        }
    }

    vm.updateUser = function() {
        if(validateUser()){
            UserService.updateUser(vm.user).then(function(){
                vm.loadUserList();
				$ngConfirm("Usuario actualizado correctamente");
                $('#modal-user').modal('hide')
            });
        }
    }

}]);
