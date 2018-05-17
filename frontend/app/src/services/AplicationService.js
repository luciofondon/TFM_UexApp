angular.module('tfm.uex').factory('AplicationService', ['$http', function($http){
    return {
      readAllAplications: function(){
        return getAplications();
      },
      readAplication: function(aplicationId){
        return getAplication(aplicationId);
      },
      createAplication: function(aplication){
        return createAplicationr(aplication);
      },
      deleteAplication: function(aplicationId){
        return removeAplication(aplicationId);
      },
      updateAplication: function(aplication){
        return updateAplicationr(aplication);
      }
	};

	function getAplications(){
		return $http.get('/api/aplications');
	}

	function getAplication(aplicationId){
		return $http.get('/api/aplication/' + aplicationId);
	}

	function addAplication(aplication){
		return $http.post('/api/aplications', aplication);
	}

	function removeAplication(aplicationId){
		return $http.delete('/api/aplication/' + aplicationId);
	}

	function updateAplication(aplication){
		return $http.put('/api/aplication/' + aplication._id, aplication);
	}


}]);
