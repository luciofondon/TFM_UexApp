var Topic = require('../models/TopicModel');
    Topic = mongoose.model('Topic');


exports.loadTopic = function(req, res, next, topicId) {
    loadTopic(req, res, next, topicId);
}


function loadTopic(req, res, next, topicId) {
    // Comprobar que el usuario registrado tiene acceso al proyecto
    Topic.load(topicId, function(err, topic) {
        if (err) 
            return res.status(500).json({error: 'El identificador no es valido'});
        if (topic == undefined) 
            return res.status(500).json({error: 'El identificador no existe'});
        req.topic = topic;
        next();
    });
}
