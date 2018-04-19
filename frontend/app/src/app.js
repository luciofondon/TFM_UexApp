var app = angular.module('tfm.uex',
	[
		'ui.router',
		'satellizer',
		'bsTable',
		'angular-loading-bar',
	])
	.constant('cfg', {
		backendUrl: '/api',
		pathTemplates: 'app/views'
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
				controller: 'LoginController as vm'
			})
			.state('password', {
				url: '/password',
				templateUrl: 'app/views/password.html',
				controller: 'PasswordController as vm'
			})
			.state('signup', {
				url: '/signup',
				templateUrl: 'app/views/signup.html',
				controller: 'SignupController as vm'
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
				controller 	: 'UserListController as vm',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('userDetail', {
				url: "/userDetail",
				templateUrl: "app/views/userDetail.html",
				controller 	: 'UserDetailController as vm',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('templateList', {
				url: "/templateList",
				templateUrl: "app/views/templateList.html",
				controller 	: 'TemplateListController as vm',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('rolList', {
				url : '/rolList',
				templateUrl : 'app/views/rolList.html',
				controller 	: 'RolListController as vm',
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
					loginRequired: loginRequired,
					projectData: projectData
				}
			})
			.state('generatorManagement', {
				url: "/generatorManagement/:projectId",
				templateUrl : 'app/views/generatorManagement.html',
				controller 	: 'GeneratorManagementController',
				resolve:{
					loginRequired: loginRequired,
					projectData: projectData
				}
			});

		$urlRouterProvider.otherwise("dashboard");

		function projectData(ProjectService, $stateParams){
			return ProjectService.getProject($stateParams.projectId).then(function(response){
				return response;
			}).catch(function(err) {
				return null;
			});
		}

		function loginRequired ($rootScope, $q, $auth, $location) {
			var deferred = $q.defer();
			if ($auth.isAuthenticated()) {
				deferred.resolve();
			} else {
				$location.path('/login');
			}
			return deferred.promise;
		}

});
