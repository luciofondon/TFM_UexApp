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
		$authProvider.loginUrl = "auth/login";
		$authProvider.signupUrl = "auth/signup";
		$authProvider.tokenName = "token";
		$authProvider.tokenPrefix = "tfm.uex";
		cfpLoadingBarProvider.includeSpinner = true;
		cfpLoadingBarProvider.latencyThreshold = 500;

		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'app/views/templates/login.html',
				controller: 'LoginController as login'
			})
			.state('signup', {
				url: '/signup',
				templateUrl: 'app/views/templates/signup.html',
				controller: 'SignupController as signup'
			})
			.state('error', {
				url: '/error/:code',
				templateUrl: 'app/views/templates/error.html',
				controller: 'HttpErrorController as vm'
			})
			.state('userList', {
				url: "/userList",
				templateUrl: "app/views/templates/userList.html",
				controller 	: 'UserListController as vm',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('userDetail', {
				url: "/userDetail",
				templateUrl: "app/views/templates/userDetail.html",
				controller 	: 'UserDetailController as vm',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('templateList', {
				url: "/templateList",
				templateUrl: "app/views/templates/templateList.html",
				controller 	: 'TemplateListController as vm',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('rolList', {
				url : '/rolList',
				templateUrl : 'app/views/templates/rolList.html',
				controller 	: 'RolListController as vm',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('dashboard', {
				url : '/dashboard',
				templateUrl : 'app/views/templates/dashboard.html',
				controller 	: 'DashboardController as vm',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('projectList', {
				url : '/projectList',
				templateUrl : 'app/views/templates/projectList.html',
				controller 	: 'ProjectListController as vm',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('configuratorManagement', {
				url: "/configuratorManagement/:projectId",
				templateUrl : 'app/views/templates/configuratorManagement.html',
				controller 	: 'ConfiguratorManagementController',
				resolve:{
					loginRequired: loginRequired,
					projectData: projectData
				}
			})
			.state('generatorManagement', {
				url: "/generatorManagement/:projectId",
				templateUrl : 'app/views/templates/generatorManagement.html',
				controller 	: 'GeneratorManagementController as gm',
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
