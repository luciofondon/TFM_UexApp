var angularRoutingApp = angular.module('tfm.uex', ['ui.router', 'satellizer', 'bsTable']);

angularRoutingApp.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('home', {
			url: "/home",
			templateUrl	: 'app/views/home.html',
			controller 	: 'SystemController',
		})
		.state('userList', {
			url: "/userList",
			templateUrl: "app/views/userList.html",
			controller 	: 'UserListController'
		})
		.state('templateList', {
			url: "/templateList",
			templateUrl: "app/views/templateList.html",
			controller 	: 'TemplateListController'
		})
		.state('rolList', {
			url : '/rolList',
			templateUrl : 'app/views/rolList.html',
			controller 	: 'RolListController'
		})
		.state('projectList', {
			url : '/projectList',
			templateUrl : 'app/views/projectList.html',
			controller 	: 'ProjectListController'
		})
		.state('projectManagement', {
			url: "/projectManagement/:projectId",
			templateUrl : 'app/views/projectManagement.html',
			controller 	: 'ProjectManagementController'
		})
		.state('userDetail', {
			url: "/userDetail/:userId",
			templateUrl : 'app/views/userDetail.html',
			controller 	: 'UserDetailController'
		});

	$urlRouterProvider.otherwise("projectList");

});



angularRoutingApp.controller('SystemController', ['$scope', '$http', '$rootScope', '$timeout', function($scope, $http, $rootScope, $timeout) {
    $http.get('/api/projects').success(function(projects) {
		$rootScope.projects = projects;
	});

}]);
