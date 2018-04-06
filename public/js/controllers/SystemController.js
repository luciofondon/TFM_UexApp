var angularRoutingApp = angular.module('tfm.uex', ['ui.router', 'bsTable']);

angularRoutingApp.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('home', {
			url: "/home",
			templateUrl	: 'templates/home.html',
			controller 	: 'SystemController',
		})
		.state('userList', {
			url: "/userList",
			templateUrl: "templates/userList.html",
			controller 	: 'UserListController'
		})
		.state('templateList', {
			url: "/templateList",
			templateUrl: "templates/templateList.html",
			controller 	: 'TemplateListController'
		})
		.state('rolList', {
			url : '/rolList',
			templateUrl : 'templates/rolList.html',
			controller 	: 'RolListController'
		})
		.state('projectList', {
			url : '/projectList',
			templateUrl : 'templates/projectList.html',
			controller 	: 'ProjectListController'
		})
		.state('projectManagement', {
			url: "/projectManagement/:projectId",
			templateUrl : 'templates/projectManagement.html',
			controller 	: 'ProjectManagementController'
		})
		.state('userDetail', {
			url: "/userDetail/:userId",
			templateUrl : 'templates/userDetail.html',
			controller 	: 'UserDetailController'
		});

	$urlRouterProvider.otherwise("projectList");

});



angularRoutingApp.controller('SystemController', ['$scope', '$http', '$rootScope', '$timeout', function($scope, $http, $rootScope, $timeout) {
    $http.get('/api/projects').success(function(projects) {
		$rootScope.projects = projects;
	});

}]);
