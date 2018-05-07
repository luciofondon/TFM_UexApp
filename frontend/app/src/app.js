var app = angular.module('tfm.uex',
	[
		'ui.router',
		'satellizer',
		'bsTable',
		'angular-loading-bar',
		'cp.ngConfirm',
		'vcRecaptcha',
		'ngFileUpload'
	])
	.constant('cfg', {
		backendUrl: '/api',
		pathTemplates: 'app/views'
	})
	.config(function($stateProvider, $urlRouterProvider, $authProvider, cfg, cfpLoadingBarProvider) {//, $location, $rootScope, $window
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
				controller 	: 'ConfiguratorManagementController as conf',
				resolve:{
					loginRequired: loginRequired,
					projectData: projectData
				}
			})
			.state('templateDetail', {
				url: "/templateDetail/:templateId",
				templateUrl : 'app/views/templates/templateDetail.html',
				controller 	: 'TemplateDetailController as td',
				resolve:{
					loginRequired: loginRequired,
					templateData: templateData
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

		function templateData(ProjectService, $stateParams){
			return ProjectService.getProject($stateParams.templateId).then(function(response){
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

		/*$rootScope.$on('$stateChangeSuccess', function(event){
        	if (!$window.ga)
            	return;
          	$window.ga('send', 'pageview', { page: $location.path() });
        });*/
		/*

			$window.ga('create', 'UA-118019427-1', 'auto');

		// track pageview on state change
		$rootScope.$on('$stateChangeSuccess', function (event) {
			$window.ga('send', 'pageview', $location.path());
		});
		*/

}).run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
	$window.ga('create', 'UA-118019427-1', 'auto');
	/*
	$rootScope.$on('$stateChangeSuccess', function(event){
		console.log("stateChangeSuccess")
		if (!$window.ga)
			return;
		$window.ga('send', 'pageview', { page: $location.path() });
	});*/
	$rootScope.$on('$locationChangeSuccess', function(event) {
		console.log('locationChangeSuccess');
		if (!$window.ga)
			return;
		$window.ga('send', 'pageview', { page: $location.path() });
	});


}]);
