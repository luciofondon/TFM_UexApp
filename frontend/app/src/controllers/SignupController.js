angular.module('tfm.uex').controller('SignupController',
	['$auth', '$state', 'UserService', 'SystemConstant',
		function($auth, $state, UserService, SystemConstant){

	var signup = this;
	signup.key = SystemConstant.KEY_PUBLIC_RECAPTCHA;

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
        signup.errores = [];
        var patronEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

        if(signup.user.email == undefined || signup.user.email == "")
			signup.errores.push("Se debe indicar un email");
        else if(signup.user.email.search(patronEmail) != 0)
			signup.errores.push("Debe introducirse un email válido");
        else if(signup.user.name == undefined || signup.user.name == "")
			signup.errores.push("Se debe indicar un nombre para el usuario");
        else if(signup.user.userName == undefined || signup.user.userName == "")
			signup.errores.push("Se debe indicar un nombre de usuario");
        else if((signup.user.phoneNumber != undefined && signup.user.phoneNumber != "") && (signup.user.phoneNumber.length < 9 || !Number.isInteger(parseInt(signup.user.phone))))
			signup.errores.push("El teléfono facilitado no es válido");
        else if(signup.user.password == undefined || signup.user.password == "")
			signup.errores.push("Se debe especificar una contraseña");
        else if(signup.user.confirmPassword == undefined || signup.user.confirmPassword == "")
			signup.errores.push("Se debe completar el campo repetir contraseña");
        else if((signup.user.password != signup.user.confirmPassword) && signup.mode == 1)
			signup.errores.push("Las dos contraseñas especificadas no coinciden");

        if(signup.errores.length > 0)
            return false
        return true;
    }

}]);
