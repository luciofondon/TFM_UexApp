
var Promise = require('promise');

var http = require('./HttpService');

module.exports = {
	getApps: function(config) {
		return request("/api/taskmanager/apps", config);
    },

    checkComunication: function(config) {
        return request("/api/taskmanager/check", config);
    },

    getProjects: function(config) {
		return request("/api/projects/allk", config);
    },

    createProject: function(config) {
		return request("/api/projects/create", config);
    },

    readAllIssues: function(config) {
		return request("/api/issues/read", config);
    },

    createIssues: function(config) {
		return request("/api/issues/create", config);
    },
}

function request(url, data){
    let promise = new Promise(function(resolve, reject){
        http.post(url, data).then(function(response){
            resolve(response);
        }).cath(function(err){
            reject({error: "No se ha podido establecer conexion con el traductor"});
        });
    });
    return promise;
}




