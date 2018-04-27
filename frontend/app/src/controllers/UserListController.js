
angular.module('tfm.uex').controller('UserListController',
    ['UserService', 'RolService', 'ProjectService', 'BootstrapTableService',
        function(UserService, RolService, ProjectService, BootstrapTableService){
	var vm = this;

	vm.alerts = [];
    vm.errores = [];
    vm.user = {};
    vm.resetPassword = {};
    vm.projects = [];
    vm.municipios = [];
    vm.bsTableUsers = {};

	vm.reset = function(){
		vm.mode=1; 
		vm.user = {}; 
		vm.errores = []; 
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
                {field: "rolName", title: "Rol", align: 'center', valign: 'middle', sortable: true},
                {field: "phone", title: "Telefono", align: 'center', valign: 'middle', sortable: true},
                {field: "projectsFormat", title: "Proyectos", align: 'center', valign: 'middle', sortable: true, visible:false},
                {field: "municipiosFormat", title: "Municipios", align: 'center', valign: 'middle', sortable: true, visible:false}
            ];

            vm.bsTableUsers = BootstrapTableService.createTableSimple(users, "UsuariosTFM-Uex", columns);

            window.actionEventsUsers = {'click .edit': function (e, value, row, index) {
				vm.errores = [];
				vm.user = row;
				vm.mode = 2;
				vm.$apply();

                },'click .remove': function (e, value, row, index) {
                    if(confirm("¿Estás seguro de borrar el usuario?")){
                        UserService.removeUser(row._id).then(function(user) {
                            for(var i = vm.bsTableUsers.options.data.length; i--;){
                                if(vm.bsTableUsers.options.data[i]._id == row._id){
                                    vm.bsTableUsers.options.data.splice(i, 1);
                                    vm.alerts.push("Usuario eliminado correctamente")
                                }
                            }
                        });
                    }
                },'click .password': function (e, value, row, index) {
                    vm.user = row;
                    vm.resetPassword = {};
                    vm.$apply();
                }
            };
        });
    }

    vm.reset = function() {
        vm.alerts = [];
        if(validatePassword()){
            UserService.resetPassword(vm.user._id, vm.resetPassword).then(function() {
                vm.alerts.push("La contraseña ha sido actualizada correctamente");
                $('#modal-password').modal('hide');
            }).catch(function(data) {
                alert(data[0].msg);
            });
        }
    }

    function validatePassword(){
        vm.errores = [];
        if((vmresetPassword.password == undefined || vm.resetPassword.password == ""))
			vm.errores.push("Se debe especificar una contraseña");
        else if((vm.resetPassword.confirmPassword == undefined || vm.resetPassword.confirmPassword == ""))
			vm.errores.push("Se debe completar el campo repetir contraseña");
        else if((vm.resetPassword.password != vm.resetPassword.confirmPassword))
			vm.errores.push("Las dos contraseñas especificadas no coinciden");

        if(vm.errores.length > 0)
            return false
        return true;
    }

    function validateUser(){
        vm.errores = [];
        var patronEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

        if(vm.user.email == undefined || vm.user.email == "")
			vm.errores.push("Se debe indicar un email");
        else if(vm.user.email.search(patronEmail) != 0)
			vm.errores.push("Debe introducirse un email válido");
        else if(vm.user.name == undefined || vm.user.name == "")
			vm.errores.push("Se debe indicar un nombre para el usuario");
        else if(vm.user.userName == undefined || vm.user.userName == "")
			vm.errores.push("Se debe indicar un nombre de usuario");
        else if((vm.user.phoneNumber != undefined && vm.user.phoneNumber != "") && (vm.user.phoneNumber.length < 9 || !Number.isInteger(parseInt(vm.user.phone))))
			vm.errores.push("El teléfono facilitado no es válido");
        else if((vm.user.password == undefined || vm.user.password == "") && vm.mode == 1)
			vm.errores.push("Se debe especificar una contraseña");
        else if((vm.user.confirmPassword == undefined || vm.user.confirmPassword == "") && vm.mode == 1)
			vm.errores.push("Se debe completar el campo repetir contraseña");
        else if((vm.user.password != vm.user.confirmPassword) && vm.mode == 1)
			vm.errores.push("Las dos contraseñas especificadas no coinciden");

        if(vm.errores.length > 0)
            return false
        return true;
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
        vm.alertas = [];
        if(validateUser()){
            UserService.updateUser(vm.user).then(function(){
                vm.loadUserList();
                vm.alertas.push("Usuario actualizado correctamente");
                $('#modal-user').modal('hide')
            });
        }
    }

}]);
