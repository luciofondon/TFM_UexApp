
const config = require('../../config/config');

var request = require('request');

exports.checkComunication = function(req, res) {
    checkComunication(req, res);
};

exports.getProjects = function(req, res) {
    getProjects(req, res);
};

exports.getApps = function(req, res) {
    getApps(req, res);
};

exports.createProject = function(req, res) {
    createProject(req, res);
};

exports.readAllIssues = function(req, res) {
    readAllIssues(req, res);
};

exports.createIssues = function(req, res) {
    createIssues(req, res);
};


function readAllIssues(req, res){
	request(
        {
            method: 'POST',
			uri: config.SERVER_EXPORT + "/api/issues/read",
			headers: {'content-type': 'application/json' },
			json: req.body
        },
        function (error, response, body) {
			if(error)
				res.status(500).json({error: "No se ha podido establecer conexion con el traductor"});
			else
				res.status(response.statusCode).json(body);

        }
    );

}

function createIssues(req, res){
	console.log("entra")
	request(
        {
            method: 'POST',
			uri: config.SERVER_EXPORT + "/api/issues/create",
			headers: {'content-type': 'application/json' },
			json: req.body
        },
        function (error, response, body) {
			if(error)
				res.status(500).json({error: "No se ha podido establecer conexion con el traductor"});
			else
				res.status(response.statusCode).json(body);

        }
    );


}

function createProject(req, res){
	request(
        {
            method: 'POST',
			uri: config.SERVER_EXPORT + "/api/projects/create",
			headers: {'content-type': 'application/json' },
			json: req.body
        },
        function (error, response, body) {
			if(error)
				res.status(500).json({error: "No se ha podido establecer conexion con el traductor"});
			else
				res.status(response.statusCode).json(body);

        }
    );
}


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
				res.status(500).json({error: "No se ha podido establecer conexion con el traductor"});
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
				res.status(500).json({error: "No se ha podido establecer conexion con el traductor"});
        }
    );
}

function checkComunication(req, res){
	console.log(req.body)
	request(
        {
            method: 'POST',
			uri: config.SERVER_EXPORT + "/api/taskmanager/check",
			json: req.body
        },
        function (error, response, body) {
            if(response != undefined)
                res.status(response.statusCode).json(body);
            else
				res.status(500).json({error: "No se ha podido establecer conexion con el traductor"});
        }
    );
}
