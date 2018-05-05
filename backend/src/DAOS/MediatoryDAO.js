
const config = require('../../config/config');

var request = require('request');

exports.checkComunications = function(req, res) {
    checkComunications(req, res);
};

exports.getProjects = function(req, res) {
    getProjects(req, res);
};

exports.getApps = function(req, res) {
    getApps(req, res);
};








function getApps(req, res){
	request(
        {
            method: 'GET',
			uri: config.SERVER_EXPORT + "/api/taskmanager/apps",
			headers: {'content-type': 'application/json' }
        },
        function (error, response, body) {
            if(response != undefined)
                res.status(response.statusCode).json(JSON.parse(body));
            else
                res.status(500).json("No se ha podido establecer conexion con el traductor");
        }
    );
}


function getProjects(req, res){
	request(
        {
            method: 'POST',
			uri: config.SERVER_EXPORT + "/api/projects/all",
			json: req.body
        },
        function (error, response, body) {
            if(response != undefined)
                res.status(response.statusCode).json(body);
            else
                res.status(500).json("No se ha podido establecer conexion con el traductor");
        }
    );
}


function checkComunications(req, res){

}
