app.controller('MainController', ['$scope', '$http', '$rootScope', '$timeout', '$interval', '$auth', 'UserService', '$state', 
function($scope, $http, $rootScope, $timeout, $interval, $auth, UserService, $state) {
	$rootScope.LoginUser = null;
	$rootScope.LoginUserLevel = 0;
	
	updateHeader();
	getUser();
	// Actualizar automaticamente la cabecera
	$interval(updateHeader, 60*1000);

	$http.get('/api/projects').success(function(projects) {
		$rootScope.projects = projects;
	});

	$scope.$on('login', function(){
		updateHeader();
		getUser();
	})

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
	/*	if ($auth.isAuthenticated()){
			$http.get('/api/incidences/false').then(function(response) {
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
			});
		}*/
	}

	function getUser(){
		if ($auth.isAuthenticated()){
			UserService.getMe().then(function(response) {
				$rootScope.LoginUser = response.data.user;
				$rootScope.LoginUserLevel = response.data.level;
			},function (error){
				console.log(error);
			});
		}
	}
}]);
