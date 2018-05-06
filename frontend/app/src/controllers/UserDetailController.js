angular.module('tfm.uex').controller('UserDetailController',
    ['$stateParams', 'UserService', '$ngConfirm',
        function($stateParams, UserService, $ngConfirm){

	var vm = this;
	vm.user = {};
	vm.disabled = true;
	vm.error = null;
	reset();

	vm.reset = function(){
		vm.disabled = true;
		reset();
	}

	function reset(){
		UserService.getMe().then(function(response) {
			vm.user  = response.data;
		}).catch(function (response){
			$ngConfirm(response.data);
		});
	}

	vm.updateUser = function(){
		if(validateUser()){
			UserService.updateMeUser(vm.user).then(function(projects){
				vm.disabled = true;
				UserService.getMe().then(function(response) {
					vm.user  = response.data;
					$ngConfirm("Usuario actualizado correctamente")
				}).catch(function (response){
					$ngConfirm(response.data.error)
				});
			});
		}else
			$ngConfirm(vm.error)
	}

	function validateUser(){
		var patronEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
		vm.error = null;
		if(vm.user.email == undefined || vm.user.email == "")
			vm.error ="Se debe indicar un email";
        else if(vm.user.email.search(patronEmail) != 0)
			vm.error ="Debe introducirse un email válido";
        else if(vm.user.name == undefined || vm.user.name == "")
			vm.error ="Se debe indicar un nombre para el usuario";
        else if(vm.user.userName == undefined || vm.user.userName == "")
			vm.error ="Se debe indicar un nombre de usuario";
        else if((vm.user.phoneNumber != undefined && vm.user.phoneNumber != "") && (vm.user.phoneNumber.length < 9 || !Number.isInteger(parseInt(vm.user.phone))))
			vm.error ="El teléfono facilitado no es válido";
		return vm.error == null ? true : false;
	}

}]);
