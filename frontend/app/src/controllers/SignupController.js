angular.module('tfm.uex').controller('SignupController',
	['$auth', '$state', 'UserService', 'SystemConstant',
		function($auth, $state, UserService, SystemConstant){

	var signup = this;
	signup.key = SystemConstant.KEY_PUBLIC_RECAPTCHA;
	signup.captcha = "";
	signup.error = null;
	signup.user = {};

	signup.signup = function(){
		if(validateUser()){
			$auth.signup(signup.user).then(function(){
				$state.go('login');
			})
			.catch(function(response){
				signup.error = response.data.error;
			});
		}
	}

    function validateUser(){
        signup.error = "";
        var patronEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
		if(signup.captcha == undefined || signup.captcha == "")
			signup.error = "Se debe utilizar el captcha";
        else if(signup.user.email == undefined || signup.user.email == "")
			signup.error = "Se debe indicar un email";
        else if(signup.user.email.search(patronEmail) != 0)
			signup.error = "Debe introducirse un email válido";
        else if(signup.user.name == undefined || signup.user.name == "")
			signup.error = "Se debe indicar un nombre para el usuario";
        else if(signup.user.userName == undefined || signup.user.userName == "")
			signup.error = "Se debe indicar un nombre de usuario";
        else if((signup.user.phoneNumber != undefined && signup.user.phoneNumber != "") && (signup.user.phoneNumber.length < 9 || !Number.isInteger(parseInt(signup.user.phone))))
			signup.error = "El teléfono facilitado no es válido";
        else if(signup.user.password == undefined || signup.user.password == "")
			signup.error = "Se debe especificar una contraseña";
        else if(signup.user.confirmPassword == undefined || signup.user.confirmPassword == "")
			signup.error = "Se debe completar el campo repetir contraseña";
        else if((signup.user.password != signup.user.confirmPassword) && signup.mode == 1)
			signup.error = "Las dos contraseñas especificadas no coinciden";

        if(signup.error != "")
            return false
        return true;
    }

}]);
