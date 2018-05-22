angular.module('tfm.uex').directive('footerPage', [function() {
    return {
        restrict: 'E',// <header-page>
        scope:{
            name: '=name'
        },
        template: ` <section class="content-header" >
                        <h1>
                            Proyecto
                            <small>{{name}}</small>
                        </h1>
                        <ol class="breadcrumb">
                            <li><a ui-sref="home"><i class="fa fa-dashboard"></i> Home</a></li>
                            <li class="active">Proyecto</li>
                        </ol>
                    </section>
                    `
    };
}]);