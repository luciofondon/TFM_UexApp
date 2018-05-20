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
		pathTemplates: 'app/views/templates'
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
				templateUrl: cfg.pathTemplates + '/login.html',
				controller: 'LoginController as login'
			})
			.state('signup', {
				url: '/signup',
				templateUrl: cfg.pathTemplates + '/signup.html',
				controller: 'SignupController as signup'
			})
			.state('error', {
				url: '/error/:code',
				templateUrl: cfg.pathTemplates + '/error.html',
				controller: 'HttpErrorController as vm'
			})
			.state('userList', {
				url: "/userList",
				templateUrl: cfg.pathTemplates + "/userList.html",
				controller 	: 'UserListController as vm',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('userDetail', {
				url: "/userDetail",
				templateUrl: cfg.pathTemplates + "/userDetail.html",
				controller 	: 'UserDetailController as vm',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('templateList', {
				url: "/templateList",
				templateUrl: cfg.pathTemplates + "/templateList.html",
				controller 	: 'TemplateListController as vm',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('rolList', {
				url : '/rolList',
				templateUrl : cfg.pathTemplates + '/rolList.html',
				controller 	: 'RolListController as vm',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('dashboard', {
				url : '/dashboard',
				templateUrl : cfg.pathTemplates + '/templates/dashboard.html',
				controller 	: 'DashboardController as vm',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('projectList', {
				url : '/projectList',
				templateUrl : cfg.pathTemplates + '/projectList.html',
				controller 	: 'ProjectListController as vm',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('configuratorManagement', {
				url: "/configuratorManagement/:aplicationId",
				templateUrl : cfg.pathTemplates + '/configuratorManagement.html',
				controller 	: 'ConfiguratorManagementController as conf',
				resolve:{
					loginRequired: loginRequired,
					aplicationData: aplicationData
				}
			})
			.state('templateDetail', {
				url: "/templateDetail/:templateId",
				templateUrl : cfg.pathTemplates + '/templateDetail.html',
				controller 	: 'TemplateDetailController as td',
				resolve:{
					loginRequired: loginRequired,
					templateData: templateData
				}
			})
			.state('generatorManagement', {
				url: "/generatorManagement/:aplicationId",
				templateUrl : cfg.pathTemplates + '/generatorManagement.html',
				controller 	: 'GeneratorManagementController as gm',
				resolve:{
					loginRequired: loginRequired,
					aplicationData: aplicationData
				}
			});

		$urlRouterProvider.otherwise("dashboard");

		function aplicationData(AplicationService, $stateParams){
			return AplicationService.readAplication($stateParams.aplicationId).then(function(response){
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

}).run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
	$window.ga('create', 'UA-118019427-1', 'auto');

	$rootScope.$on('$locationChangeSuccess', function(event) {
		if (!$window.ga)
			return;
		$window.ga('send', 'pageview', { page: $location.path() });
	});

}]);
