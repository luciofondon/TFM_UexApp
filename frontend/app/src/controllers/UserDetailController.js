angular.module('tfm.uex').controller('UserDetailController',
    ['$stateParams', 'UserService', '$ngConfirm', 'UploadService',
        function($stateParams, UserService, $ngConfirm, UploadService){

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
			upload(function(status, nameImage){
				if(status == 200 && nameImage != undefined)
					vm.user.image = nameImage;

				UserService.updateMeUser(vm.user).then(function(project) {
					vm.disabled = true;
					UserService.getMe().then(function(response) {
						vm.user  = response.data;
						$ngConfirm("Usuario actualizado correctamente")
					}).catch(function (response){
						$ngConfirm(response.data.error)
					});
				});
			});
		}else{
			$ngConfirm(vm.error)
		}
	}

	function upload(callback){
		if(vm.user.image != undefined){
			Upload.upload({
				url: '/api/user/upload',
				file: vm.user.image
			}).then(function (response) {
				callback(response.status, response.data.name);
			}, function (response) { // Error
				callback(response.status);
			}, function (evt) {
				var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			});
		}else{
			callback(200, "");
		}
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

