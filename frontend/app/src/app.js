var app = angular.module('gamma.efi.zentinnel', [
	'ui.router',
	'satellizer',
	'bsTable',
	'ui.select',
	'ngSanitize',
	'angular-loading-bar',
	'ngJsTree'])
	.constant('cfg', {
		backendUrl: '/api'
	})
	.config(function ($stateProvider, $urlRouterProvider, $authProvider, cfpLoadingBarProvider, cfg, $httpProvider) {
		// Parametros de configuración
		$authProvider.loginUrl = cfg.backendUrl + "/login";
		$authProvider.tokenName = "token";
		$authProvider.tokenPrefix = "gamma.efi.zentinnel";
		cfpLoadingBarProvider.includeSpinner = false;
		cfpLoadingBarProvider.latencyThreshold = 500;
		//$httpProvider.interceptors.push('ResponseObserver');

		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'app/views/login.html',
				controller: 'LoginController'
			})
			.state('error', {
				url: '/error/:code',
				templateUrl: 'app/views/error.html',
				controller: 'HttpErrorController'
			})
			.state('projects', {
				url: '/project/list',
				templateUrl: 'app/views/projectList.html',
				controller: 'ProjectListController',
				resolve:{
					loginRequired: loginRequired,
					//projectListData: projectListData
				}
			})
			.state('projectDashboard', {
				url: '/project/:projectId/dashboard',
				templateUrl: 'app/views/projectDashboard.html',
				controller: 'ProjectDashboardController',
				resolve:{
					loginRequired: loginRequired,
					projectData: projectData
				}
			})
			.state('projectMeterList', {
				url: '/project/:projectId/meter/list',
				templateUrl: 'app/views/projectMeterList.html',
				controller: 'ProjectMeterListController',
				resolve:{
					loginRequired: loginRequired,
					projectData: projectData
				}
			})
			.state('projectMeterDashboard', {
				url: '/project/:projectId/meter/:meterId/dashboard',
				templateUrl: 'app/views/meterDashboard.html',
				controller: 'MeterDashboardController',
				resolve:{
					loginRequired: loginRequired,
					projectData: projectData,
					meterData: meterData
				}
			})
			.state('projectMeterManagement', {
				url: '/project/:projectId/:meterId/management',
				templateUrl: 'app/views/meterManagement.html',
				controller: 'MeterManagementController',
				resolve:{
					loginRequired: loginRequired,
					projectData: projectData,
					meterData: meterData
				}
			})
			.state('projectMeterCalendar', {
				url : '/project/:projectId/:meterId/calendar',
				templateUrl : 'app/views/meterCalendarManagement.html',
				controller 	: 'MeterCalendarManagementController',
				resolve:{
					loginRequired: loginRequired,
					projectData: projectData,
					meterData: meterData
				}
			})
			.state('projectInventory', {
				url: '/project/:projectId/inventory',
				templateUrl: 'app/views/inventoryList.html',
				controller: 'InventoryListController',
				resolve:{
					loginRequired: loginRequired,
					projectData: projectData
				}
			})
			.state('projectLocation', {
				url: '/project/:projectId/location',
				templateUrl: 'app/views/locationList.html',
				controller: 'LocationListController',
				resolve:{
					loginRequired: loginRequired,
					projectData: projectData
				}
			}) 
			.state('analisysManagement', {
				url: '/analytic',
				templateUrl: 'app/views/analisysManagement.html',
				controller: 'AnalisysManagementController',
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
			.state('incidenceList', {
				url : '/incidenceList',
				templateUrl : 'app/views/incidenceList.html',
				controller 	: 'IncidenceListController',
				resolve:{
					loginRequired: loginRequired
				}

			})
			.state('powerList', {
				url : '/powerList',
				templateUrl : 'app/views/powerList.html',
				controller 	: 'PowerListController',
				resolve:{
					loginRequired: loginRequired
				}

			})
			.state('tariffList', {
				url : '/tariffList',
				templateUrl : 'app/views/tariffList.html',
				controller 	: 'TariffListController',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('reportManagement', {
				url : '/reportManagement',
				templateUrl : 'app/views/reportManagement.html',
				controller 	: 'ReportManagementController',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('notificationList', {
				url : '/notificationList',
				templateUrl : 'app/views/notificationList.html',
				controller 	: 'NotificationListController',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('alarmManagement', {
				url : '/alarmManagement',
				templateUrl : 'app/views/alarmManagement.html',
				controller 	: 'AlarmManagementController',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('alarmReport', {
				url : '/alarmReport',
				templateUrl : 'app/views/alarmReport.html',
				controller 	: 'AlarmReportController',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('incidenceReport', {
				url : '/incidenceReport',
				templateUrl : 'app/views/incidenceReport.html',
				controller 	: 'IncidenceReportController',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('incidenceManagement', {
				url : '/incidenceManagement/:incidenceId',
				templateUrl : 'app/views/incidenceManagement.html',
				controller 	: 'IncidenceManagementController',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('economicReport', {
				url : '/economicReport',
				templateUrl : 'app/views/economicReport.html',
				controller 	: 'EconomicReportController',
				resolve:{
					loginRequired: loginRequired
				}
			})
			.state('invoiceManagement', {
				url : '/invoiceManagement',
				templateUrl : 'app/views/invoiceManagement.html',
				controller 	: 'InvoiceManagementController',
				resolve:{
					loginRequired: loginRequired
				}
			});
			$urlRouterProvider.otherwise("/project/list");

			function projectData(ProjectService, $stateParams){
				return ProjectService.getProject($stateParams.projectId).then(function(response){
					return response;
				}).catch(function(err) {
					console.log(err);
					return null;
				});
			}

			function projectListData(ProjectService){
				return ProjectService.getProjectsDashboard().then(function(response){
					return response;
				}).catch(function(err) {
					console.log(err);
					return null;
				});
			}

			function meterData(MeterService, $stateParams){
				return MeterService.getMeter($stateParams.meterId).then(function(response){
					return response;
				}).catch(function(err) {
					console.log(err);
					return null;
				})
			}		
			
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
