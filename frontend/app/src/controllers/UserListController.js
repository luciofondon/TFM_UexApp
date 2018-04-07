
angular.module('tfm.uex').controller('UserListController', ['$scope', '$http', function($scope, $http){
    $scope.alerts = [];
    $scope.errores = [];
    $scope.user = {};
    $scope.resetPassword = {};
    $scope.projects = [];
    $scope.municipios = [];
    $scope.bsTableUsers = {};


    $scope.init = function() {
        $http.get('/api/roles').success(function(roles) {
            $scope.roles = roles;
        });

        $http.get("/api/projects").success(function(projects) {
            $scope.projects = projects;
        });
    }


    $scope.loadUserList = function(){
        $http.get('/api/users').success(function(users) {
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

            $scope.bsTableUsers = {
                options: {
                    data: users, 
                    striped: true,
                    showToggle: true,
                    toolbar:"#crear",
                    exportDataType: "all",
                    exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'],
                    exportOptions:{
                        fileName: "UsuariosTFM-Uex",
                        ignoreColumn:[0],
                        type:'pdf',
                        jspdf: {
                            orientation: 'l',
                            format: 'a3',
                            margins: {left:10, right:10, top:20, bottom:20},
                            autotable: {tableWidth: 'wrap'}
                        }
                    },
                    showRefresh: false,
                    showExport: true,
                    pagination: true,      
                    pageSize: 15,
                    exportDataType:'all',
                    pageList: [5, 10, 15, 25, 50, 100],
                    search: true,
                    showColumns: true,
                    showPaginationSwitch: true,
                    minimumCountColumns: 1,
                    clickToSelect: false,
                    maintainSelected: true,
                    mobileResponsive: true,                                                    
                    columns: [
                        {align: 'center', width:'80px', valign: 'middle', formatter:actionFormatterUsers, events:'actionEventsUsers'}, 
                        {field: "createdFormat", title: "Creacion", align: 'center', valign: 'middle', sortable: true},
                        {field: "name", title: "Nombre", align: 'center', valign: 'middle', sortable: true}, 
                        {field: "username", title: "Usuario", align: 'center', valign: 'middle', sortable: true}, 
                        {field: "email", title: "Email", align: 'center', valign: 'middle', sortable: true}, 
                        {field: "rolName", title: "Rol", align: 'center', valign: 'middle', sortable: true}, 
                        {field: "phone", title: "Telefono", align: 'center', valign: 'middle', sortable: true},
                        {field: "projectsFormat", title: "Proyectos", align: 'center', valign: 'middle', sortable: true, visible:false},
                        {field: "municipiosFormat", title: "Municipios", align: 'center', valign: 'middle', sortable: true, visible:false}
                    ]
                }
            };

            window.actionEventsUsers = {'click .edit': function (e, value, row, index) {
                    $scope.errores = [];
                    $scope.user = row;
                    $scope.mode = 2;
                    $scope.$apply();

                },'click .remove': function (e, value, row, index) {
                    if(confirm("¿Estás seguro de borrar el usuario?")){
                        $http.delete('/api/user/' + row._id).success(function(user) {
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
                },
            }; 
        });
    }


    $scope.reset = function() {
        $scope.alerts = [];
        if(validatePassword()){
            $http.put('/api/user/resetPassword/' + $scope.user._id, $scope.resetPassword).success(function() {
                $scope.alerts.push("La contraseña ha sido actualizada correctamente");
                $('#modal-password').modal('hide');
            }).error(function(data) {
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
        else if($scope.user.username == undefined || $scope.user.username == "") 
            $scope.errores.push("Se debe indicar un nombre de usuario");
        else if(($scope.user.phone != undefined && $scope.user.phone != "") && ($scope.user.phone.length < 9 || !Number.isInteger(parseInt($scope.user.phone))))
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
            $http.post('/api/users', $scope.user).success(function(project) { 
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
            $http.put('/api/user/' + $scope.user._id, $scope.user).success(function(){
                $scope.loadUserList();
                $scope.alertas.push("Usuario actualizado correctamente");
                $('#modal-user').modal('hide')
            });
        }
    }

}]);