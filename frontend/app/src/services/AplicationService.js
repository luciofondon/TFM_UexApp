angular.module('tfm.uex').factory('AplicationService', ['$http', function($http){
    return {
      getAplications: function(){
        return getAplications();
      },
      getAplication: function(aplicationId){
        return getAplication(aplicationId);
      },
      addAplication: function(aplication){
        return addAplicationr(aplication);
      },
      removeAplication: function(aplicationId){
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
