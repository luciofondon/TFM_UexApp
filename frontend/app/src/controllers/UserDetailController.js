angular.module('tfm.uex').controller('UserDetailController',
    ['$stateParams', 'UserService',
        function($stateParams, UserService){

	var vm = this;
	vm.user = {};

	UserService.getMe().then(function(response) {
		vm.user  = response.data;
	}).catch(function (error){
		console.log(error);
	});

	vm.updateUser = function(){

	}


}]);
