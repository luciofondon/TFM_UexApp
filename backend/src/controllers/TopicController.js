var _ = require('lodash');

var Topic = require('../models/TopicModel');

var topicMiddleware = require('../middlewares/TopicMiddleware'),
	topicRepository = require('../repositories/TopicRepository');

module.exports = function() {

    return {
		loadTopic: function(req, res, next, topicId) {
            topicMiddleware.loadTopic(req, res, next, topicId);
        },

        readAllByAplication: function(req, res) {
			topicRepository.readAllByAplication(req.authUser, req.params.aplicationId).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
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
