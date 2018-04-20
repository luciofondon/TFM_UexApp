angular.module('tfm.uex').controller('SignupController',
	['$auth', '$state', 'UserService',
		function($auth, $state, UserService){

	var signup = this;

	signup.signup = function(){
		$auth.signup(signup.user).then(function(){
			$state.go('login');
		})
		.catch(function(response){
			signup.error = response.data.error;
		});
	}

}]);
