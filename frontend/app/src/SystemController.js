var angularRoutingApp = angular.module('tfm.uex', 
	[	
		'ui.router', 
		'satellizer', 
		'bsTable'
	])
	.constant('cfg', {
		backendUrl: '/api'
	})
	.config(function($stateProvider, $urlRouterProvider, $authProvider, cfg) {
		// Parametros de configuración
		$authProvider.loginUrl = cfg.backendUrl + "/login";
		$authProvider.tokenName = "token";
		$authProvider.tokenPrefix = "tfm.uex";
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'app/views/login.html',
				controller: 'LoginController'
			})
			.state('home', {
				url: "/home",
				templateUrl	: 'app/views/home.html',
				controller 	: 'SystemController',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('userList', {
				url: "/userList",
				templateUrl: "app/views/userList.html",
				controller 	: 'UserListController',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('templateList', {
				url: "/templateList",
				templateUrl: "app/views/templateList.html",
				controller 	: 'TemplateListController',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('rolList', {
				url : '/rolList',
				templateUrl : 'app/views/rolList.html',
				controller 	: 'RolListController',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('projectList', {
				url : '/projectList',
				templateUrl : 'app/views/projectList.html',
				controller 	: 'ProjectListController',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('projectManagement', {
				url: "/projectManagement/:projectId",
				templateUrl : 'app/views/projectManagement.html',
				controller 	: 'ProjectManagementController',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('userDetail', {
				url: "/userDetail/:userId",
				templateUrl : 'app/views/userDetail.html',
				controller 	: 'UserDetailController',
				resolve:{
					loginRequired: loginRequired
				}
			});

		$urlRouterProvider.otherwise("projectList");
		function loginRequired ($rootScope, $q, $auth, $location) {
			var deferred = $q.defer()
			if ($auth.isAuthenticated()) {
				deferred.resolve()
			} else {
				$location.path('/login')
			}
			return deferred.promise
		}

});



angularRoutingApp.controller('SystemController', ['$scope', '$http', '$rootScope', '$timeout', function($scope, $http, $rootScope, $timeout) {
    $http.get('/api/projects').success(function(projects) {
		$rootScope.projects = projects;
	});

}]);
