angular.module('tfm.uex').controller('LoginController', 
    ['$rootScope', '$scope', '$auth', '$state', 'UserService', '$window', 
        function($rootScope, $scope, $auth, $state, UserService, $window){

	$scope.email='';
	$scope.password='';
	$scope.error=null;

	if ($auth.isAuthenticated()) {
		$window.location.href = '/';
		//$state.go('projects');
	}
 
	$scope.login = function(){
		console.log("Login")
		$auth.login({
			email: $scope.email,
			password: $scope.password
		})
		.then(function(){
			$window.location.href = '/';
			//$state.go('projects');

			$scope.$emit('login');
		})
		.catch(function(response){
			console.log(response.data.error);
			$scope.error = response.data.error;
		});
	}
}]); 
