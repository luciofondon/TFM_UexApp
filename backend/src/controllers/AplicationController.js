
var _ = require('lodash');

var Aplication = require('../models/AplicationModel');

var aplicationMiddleware = require('../middlewares/AplicationMiddleware'),
	aplicationRepository = require('../repositories/AplicationRepository');

module.exports = function() {

    return {

        loadAplication: function(req, res, next, aplicationId) {
            aplicationMiddleware.loadAplication(req, res, next, aplicationId);
        },

        readAplication: function(req, res) {
            res.json(req.aplication);
        },

        readAllAplication: function(req, res) {
			aplicationRepository.readAllAplication(req.authUser).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
        },

        createAplication: function(req, res) {
			aplicationRepository.createAplication(req.authUser, new Aplication(req.body)).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
        },

        updateAplication: function(req, res) {
			aplicationRepository.updateAplication(req.authUser, _.extend(req.aplication, req.body)).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
        },

        deleteAplication: function(req, res) {
			aplicationRepository.updateAplication(req.authUser, req.aplication).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
		}

    }
}
