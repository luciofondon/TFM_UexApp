angular.module('tfm.uex').controller('RolListController', 
    ['$scope', 'RolService', 'BootstrapTableService', 
        function($scope, RolService, BootstrapTableService){
            
    $scope.bsTableRoles = {}
 	$scope.loadRolList = function(){
        RolService.getRoles().then(function(response) {
            var roles = response.data;
            roles.forEach(function(rol){
                var created = new Date(rol.created);
                rol.createdFormat = ( "0" + created.getHours()).slice(-2)+":"+ ( "0" + created.getMinutes()).slice(-2)+":"+ ( "0" + created.getSeconds()).slice(-2) + " " + ( "0" + created.getDate()).slice(-2)+"/"+ ( "0" + (created.getMonth()+1)).slice(-2)+"/"+created.getFullYear();
            }); 
            
           var columns= [
                {field: "createdFormat", title: "Creacion", align: 'center', valign: 'middle', sortable: true},
                {field: "name", title: "Nombre", align: 'center', valign: 'middle', sortable: true}, 
                {field: "description", title: "Descripción", align: 'center', valign: 'middle'}, 
                {field: "level", title: "Nivel", align: 'center', valign: 'middle', sortable: true}

            ];

            //BootstrapTableService.createTableSimple(roles, "RolesTFM-Uex", columns);

            $scope.bsTableRoles = {
                options: {
                    data: roles, 
                    striped: true,
                    showToggle: true,
                    exportDataType: "all",
                    exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'],
                    exportOptions:{
                        fileName: "RolesTFM-Uex",
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
                    exportDataType:'all',
                    search: true,
                    showColumns: true,
                    maintainSelected: true,
                    mobileResponsive: true,                    
                    columns: [
                        {field: "createdFormat", title: "Creacion", align: 'center', valign: 'middle', sortable: true},
                        {field: "name", title: "Nombre", align: 'center', valign: 'middle', sortable: true}, 
                        {field: "description", title: "Descripción", align: 'center', valign: 'middle'}, 
                        {field: "level", title: "Nivel", align: 'center', valign: 'middle', sortable: true}

                    ]
                }
            }; 
        });
    }

}]);