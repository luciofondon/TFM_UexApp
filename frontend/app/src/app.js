var app = angular.module('tfm.uex', 
	[	
		'ui.router', 
		'satellizer', 
		'bsTable',
		'angular-loading-bar',
	])
	.constant('cfg', {
		backendUrl: '/api'
	})
	.config(function($stateProvider, $urlRouterProvider, $authProvider, cfg, cfpLoadingBarProvider) {
		// Parametros de configuración
		$authProvider.loginUrl = cfg.backendUrl + "/login";
		$authProvider.tokenName = "token";
		$authProvider.tokenPrefix = "tfm.uex";
		cfpLoadingBarProvider.includeSpinner = true;
		cfpLoadingBarProvider.latencyThreshold = 500;
		
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'app/views/login.html',
				controller: 'LoginController'
			}) 
			.state('register', {
				url: '/register',
				templateUrl: 'app/views/register.html',
				controller: 'RegisterController'
			}) 
			.state('error', {
				url: '/error/:code',
				templateUrl: 'app/views/error.html',
				controller: 'HttpErrorController'
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
			.state('userDetail', {
				url: "/userDetail",
				templateUrl: "app/views/userDetail.html",
				controller 	: 'UserDetailController',
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
			.state('dashboard', {
				url : '/dashboard',
				templateUrl : 'app/views/dashboard.html',
				controller 	: 'DashboardController',
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
			.state('configuratorManagement', {
				url: "/configuratorManagement/:projectId",
				templateUrl : 'app/views/configuratorManagement.html',
				controller 	: 'ConfiguratorManagementController',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('generatorManagement', {
				url: "/generatorManagement/:projectId",
				templateUrl : 'app/views/generatorManagement.html',
				controller 	: 'GeneratorManagementController',
				resolve:{
					loginRequired: loginRequired
				}
			});
		$urlRouterProvider.otherwise("dashboard");
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


/*
app.controller('SystemController', ['$scope', '$http', '$rootScope', '$timeout', function($scope, $http, $rootScope, $timeout) {
    $http.get('/api/projects').success(function(projects) {
		$rootScope.projects = projects;
	});

}]);
*/ 
