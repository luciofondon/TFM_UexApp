angular.module('tfm.uex').service('UploadService', ['Upload', function(Upload) {

	return {
		uploadFile: function(file){
			return uploadFile(file);
		}
	};

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

}]);

