
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Servicio para comunicarse con el componente Mediatory
 */

var Promise = require('promise');

var http = require('./HttpService');

module.exports = {
	getApps: function(config) {
		return requestGET("/api/taskmanager/apps");
    },

    checkComunication: function(config) {
        return requestPOST("/api/taskmanager/check", config);
    },

    getProjects: function(config) {
		return requestPOST("/api/projects/all", config);
    },

    createProject: function(config) {
		return requestPOST("/api/projects/create", config);
    },

    readAllIssues: function(config) {
		return requestPOST("/api/issues/read", config);
    },

    createIssues: function(config) {
		return requestPOST("/api/issues/create", config);
    },
}

function requestPOST(url, data){
    let promise = new Promise(function(resolve, reject){
        http.post(url, data).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject({error: "No se ha podido establecer conexion con el traductor"});
        });
    });
    return promise;
}


function requestGET(url){
    let promise = new Promise(function(resolve, reject){
        http.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject({error: "No se ha podido establecer conexion con el traductor"});
        });
    });
    return promise;
}



