var _ = require('lodash');

var Topic = require('../models/TopicModel');

var topicMiddleware = require('../middlewares/TopicMiddleware'),
	topicDAO = require('../DAOS/TopicDAO'),
	topicRepository = require('../repositories/TopicRepository');

module.exports = function() {

    return {
		loadTopic: function(req, res, next, topicId) {
            topicMiddleware.loadTopic(req, res, next, topicId);
        },

        readAllByAplication: function(req, res) {
            topicDAO.readAllByAplication(req,res);
        },

        createTopicByAplication: function(req, res) {
			topicRepository.createTopicByAplication(req.authUser, new Topic(req.body), req.params.aplicationId).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
        },

        deleteTopic: function(req, res) {
			topicRepository.deleteTopic(req.authUser, req.topic).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
		},

        updateTopic: function(req, res) {
			topicRepository.updateTopic(req.authUser, _.extend(req.topic, req.body)).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
		},

		readTopic: function(req, res) {
			res.json(req.topic);
		}

    }
}
