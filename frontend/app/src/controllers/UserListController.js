
angular.module('tfm.uex').controller('UserListController', 
    ['$scope', 'UserService', 'RolService', 'ProjectService', 'BootstrapTableService',
        function($scope, UserService, RolService, ProjectService, BootstrapTableService){
    $scope.alerts = [];
    $scope.errores = [];
    $scope.user = {};
    $scope.resetPassword = {};
    $scope.projects = [];
    $scope.municipios = [];
    $scope.bsTableUsers = {};


    $scope.init = function() {
        RolService.getRoles().then(function(response) {
            $scope.roles = response.data;
        });

        ProjectService.getProjects().then(function(projects) {
            $scope.projects = projects;
        });
    }


    $scope.loadUserList = function(){
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
                {align: 'center', width:'80px', valign: 'middle', formatter:actionFormatterUsers, events:'actionEventsUsers'}, 
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

            $scope.bsTableUsers = BootstrapTableService.createTableSimple(users, "UsuariosTFM-Uex", columns);

            window.actionEventsUsers = {'click .edit': function (e, value, row, index) {
                console.log(row)
                    $scope.errores = [];
                    $scope.user = row;
                    $scope.mode = 2;
                    $scope.$apply();

                },'click .remove': function (e, value, row, index) {
                    if(confirm("¿Estás seguro de borrar el usuario?")){
                        UserService.removeUser(row._id).then(function(user) {
                            for(var i = $scope.bsTableUsers.options.data.length; i--;){
                                if($scope.bsTableUsers.options.data[i]._id == row._id){                   
                                    $scope.bsTableUsers.options.data.splice(i, 1); 
                                    $scope.alerts.push("Usuario eliminado correctamente") 
                                }       
                            } 
                        });
                    } 
                },'click .password': function (e, value, row, index) {
                    $scope.user = row;
                    $scope.resetPassword = {};
                    $scope.$apply();
                }
            }; 
        });
    }

    $scope.reset = function() {
        $scope.alerts = [];
        if(validatePassword()){
            UserService.resetPassword($scope.user._id, $scope.resetPassword).then(function() {
                $scope.alerts.push("La contraseña ha sido actualizada correctamente");
                $('#modal-password').modal('hide');
            }).catch(function(data) {
                alert(data[0].msg);
            });
        }
    }

    function validatePassword(){
        $scope.errores = [];
        if(($scope.resetPassword.password == undefined || $scope.resetPassword.password == "")) 
            $scope.errores.push("Se debe especificar una contraseña");
        else if(($scope.resetPassword.confirmPassword == undefined || $scope.resetPassword.confirmPassword == "")) 
            $scope.errores.push("Se debe completar el campo repetir contraseña");
        else if(($scope.resetPassword.password != $scope.resetPassword.confirmPassword)) 
            $scope.errores.push("Las dos contraseñas especificadas no coinciden");
        
        if( $scope.errores.length > 0)
            return false
        else
            return true;
    }
        
    function validateUser(){
        $scope.errores = [];
        var patronEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

        if($scope.user.email == undefined || $scope.user.email == "") 
            $scope.errores.push("Se debe indicar un email");
        else if($scope.user.email.search(patronEmail) != 0)
            $scope.errores.push("Debe introducirse un email válido");
        else if($scope.user.name == undefined || $scope.user.name == "") 
            $scope.errores.push("Se debe indicar un nombre para el usuario");
        else if($scope.user.userName == undefined || $scope.user.userName == "") 
            $scope.errores.push("Se debe indicar un nombre de usuario");
        else if(($scope.user.phoneNumber != undefined && $scope.user.phoneNumber != "") && ($scope.user.phoneNumber.length < 9 || !Number.isInteger(parseInt($scope.user.phone))))
            $scope.errores.push("El teléfono facilitado no es válido");
        else if(($scope.user.password == undefined || $scope.user.password == "") && $scope.mode == 1) 
            $scope.errores.push("Se debe especificar una contraseña");
        else if(($scope.user.confirmPassword == undefined || $scope.user.confirmPassword == "") && $scope.mode == 1) 
            $scope.errores.push("Se debe completar el campo repetir contraseña");
        else if(($scope.user.password != $scope.user.confirmPassword) && $scope.mode == 1) 
            $scope.errores.push("Las dos contraseñas especificadas no coinciden");

        if( $scope.errores.length > 0)
            return false
        else
            return true;
    }
 
    $scope.createUser = function() {
        console.log($scope.user)
        if(validateUser()){
            UserService.addUser($scope.user).then(function(project) { 
                $scope.user = {};
                $scope.loadUserList();
                $scope.alerts = [];
                $scope.alertas.push("Usuario creado correctamente");
                $('#modal-user').modal('hide');
            });
        }
    }

    $scope.updateUser = function() {   
        $scope.alertas = [];
        if(validateUser()){
            UserService.updateUser(scope.user).then(function(){
                $scope.loadUserList();
                $scope.alertas.push("Usuario actualizado correctamente");
                $('#modal-user').modal('hide')
            });
        }
    }

}]);