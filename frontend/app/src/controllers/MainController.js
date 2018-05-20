app.controller('MainController',
	['$scope', '$rootScope', '$timeout', '$interval', '$auth', 'UserService', '$state', 'AplicationService', 'ProjectService',
		function($scope, $rootScope, $timeout, $interval, $auth, UserService, $state, AplicationService, ProjectService) {

	$rootScope.LoginUser = null;
	var projectsSrc = [];
	updateHeader();
	getUser();
	// Actualizar automaticamente la cabecera
	$interval(updateHeader, 60*1000);

	ProjectService.readAllProjects().then(function(responseProjects) {
		AplicationService.readAllAplications().then(function(responseAplications) {
			var projects = responseProjects.data;
			var aplications = responseAplications.data;
			projects.forEach(function(project){
				project.aplications = [];
				aplications.forEach(function(aplication){
					if(project._id.toString() == aplication.project._id.toString())
						project.aplications.push(aplication);
				});
			});
			$rootScope.projects = projects;
			projectsSrc = $rootScope.projects;

		});
	});

	$scope.$on('login', function(){
		updateHeader();
		getUser();
	})

	$rootScope.findProject = function(filter){
		$rootScope.projects = [];
		projectsSrc.forEach(function(project){
			if(project.name.toLowerCase() .includes(filter.toLowerCase()))
				$rootScope.projects.push(project)
		});
	}

	$rootScope.logout = function(){
		$auth.logout()
		.then(function() {
			// Desconectamos al usuario y lo redirijimos
			$state.go("login")
			$rootScope.LoginUser = null;
			$rootScope.LoginUserLevel = 0;
		});
	}

	$rootScope.isLoggedIn = function(){
		return $auth.isAuthenticated()
	}

	$rootScope.hasAdmin = function(){
		return hasPermission(1);
	}

	$rootScope.hasOperador = function(){
		return hasPermission(2);
	}

	$rootScope.hasConsultor = function(){
		return hasPermission(4);
	}

	function hasPermission(level){
		return $rootScope.LoginUserLevel <= level;
	}

	function updateHeader(){
		if ($auth.isAuthenticated()){
			/*$http.get('/api/incidences/false').then(function(response) {
				ignoreLoadingBar: true
				$rootScope.incidences = response.data;
			},function (error){
				console.log(error);
			});

			$http.get('/api/notifications/false').then(function(response) {
				ignoreLoadingBar: true
				$rootScope.notifications = response.data;
			},function(error){
				console.log(error);
			});*/
		}
	}

	function getUser(){
		if ($auth.isAuthenticated()){
			UserService.getMe().then(function(response) {
				$rootScope.LoginUser = response.data;
			}).catch(function (error){
				console.log(error);
			});
		}
	}
}]);
