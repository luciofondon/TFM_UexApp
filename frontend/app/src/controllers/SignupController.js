angular.module('tfm.uex').controller('SignupController',
	['$auth', '$state', 'UserService', 'SystemConstant',
		function($auth, $state, UserService, SystemConstant){

	var signup = this;
	signup.key = SystemConstant.KEY_PUBLIC_RECAPTCHA;

	signup.signup = function(){
		$auth.signup(signup.user).then(function(){
			$state.go('login');
		})
		.catch(function(response){
			signup.error = response.data.error;
		});
	}

}]);
