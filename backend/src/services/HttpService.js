
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Servicio para realizar peticion HTTP
 */

var request = require('request'),
    Promise = require('promise');

const config = require('../../config/config');

module.exports = {

	/**
	 * @param  {} url Recurso al que realizar la peticion
	 * @param  {} data JSON que se enviara en la peticion
     * @description Realizar peticion post
	 */
	post: function(url, data) {
		return post(url, data);
    },

	/**
	 * @param  {} url Recurso al que realizar la peticion
     * @description Realizar una peticion get
	 */
	get: function(url) {
		return get(url);
	}
}

function post(url, data){
	let promise = new Promise(function(resolve, reject){
        request(
            {
                method: 'POST',
                uri: config.SERVER_EXPORT + url,
                headers: {'content-type': 'application/json' },
                json: data
            },
            function (error, response, body) {
                if(error){
					reject({error: "No se ha podido establecer conexion con el traductor"});
				}else if(body.error != undefined){
					reject({error: body.error});
				}else{
					resolve(body);
				}
            }
        );
    });
    return promise;
}

function get(url){
	let promise = new Promise(function(resolve, reject){
        request(
            {
                method: 'GET',
                uri: config.SERVER_EXPORT + url,
                headers: {'content-type': 'application/json' }
            },
            function (error, response, body) {
                if(response != undefined)
                    resolve(JSON.parse(body));
                else
                    reject({error: "No se ha podido establecer conexion con el traductor"});
            }
        );
    });
    return promise;
}
