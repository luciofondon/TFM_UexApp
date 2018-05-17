
var _ = require('lodash');

var Project = require('../models/ProjectModel');
var Aplication = require('../models/AplicationModel');
var Topic = require('../models/TopicModel');


module.exports = {

	createAplication: function(req, res) {
        createAplication(req, res);
	},

    readAllAplication: function(req, res){
        readAllAplication(req, res);
    },

    updateAplication: function(req, res){
        updateAplication(req, res);
    },

    deleteAplication: function(req, res){
        deleteAplication(req, res);
    },

    generateAplicationFromTempate: function(req, res){
        generateAplicationFromTempate(req, res);
    }
}

function createAplication(req, res){

    let aplication = new Aplication(req.body);
    if(validateAplication(aplication)){
        aplication.save(function(err) {
            if (err) {
                return res.status(500).json({error: 'Cannot save the aplication'});
            }
            res.json(aplication);
        });
    }else
        return res.status(500).json({ error: "Parametros de la API no validos"});
}

function updateAplication(req, res){
    let aplication = _.extend(req.aplication, req.body);
    if(validateAplication(aplication)){
        aplication.save(function(err) {
            if (err) {
                return res.status(500).json({error: 'Cannot update the project'});
            }
            res.json(aplication);
        });
    }else
        return res.status(500).json({ error: "Parametros de la API no validos"});
}


function readAllAplication(req, res){
    // Comprobar los proyectos a los que el usuario tiene permisos
    var filter = {};
    if(req.authUser.rol.level == 1)
        filter = {isTemplate: false};
    else
        filter = {isTemplate: false, creator: req.authUser._id}

    Project.find(filter, {_id:1}).sort({name:1}).exec(function(err, projects) {
        if (err) {
            return res.status(500).json({ error: 'Cannot list all the projects' });
        }
        let projectsIds = [];
        projects.forEach(function(project){
            projectsIds.push(project._id);
        });
        Aplication.find({project: {$in: projectsIds}}).populate("project").sort({name:1}).exec(function(err, aplications) {
            res.json(aplications);
        });
    });
}

function deleteAplication(req, res){
    let aplication = req.aplication;
	Topic.find({aplication: aplication._id}, {"__v":0}).exec(function(err, topics){
		topics.forEach(function(topic){
			Question.remove({topic: topic._id}, function(err){

			});
		});
		Topic.remove({aplication: aplication._id}, function(err){
            aplication.remove(function(err){
                if (err) {
                    return res.status(500).json({error: 'Cannot delete the aplication'});
                }
                res.json(aplication);
            });
		});
    });
}

function generateAplicationFromTempate(req, res){
	let template = req.body;
	let aplication = req.aplication;
	let aplicationCopy = JSON.parse(JSON.stringify(project));
	let aplicationTemplate = new Aplication(aplicationCopy);
	aplicationTemplate.isTemplate = false;
	aplicationTemplate.creator = req.authUser._id;
	aplicationTemplate.nameTemplate = undefined;
	aplicationTemplate._id = mongoose.Types.ObjectId();
	aplicationTemplate.save(function(err){
		Topic.find({project: aplicationCopy._id}, {"__v":0}).exec(function(err, topics){
			topics.forEach(function(topic){
				let topicCopy = JSON.parse(JSON.stringify(topic));
				let topicTemplate = new Topic(topicCopy);
				topicTemplate.project = aplicationTemplate._id;
				topicTemplate._id = mongoose.Types.ObjectId();
				topicTemplate.save(function(err){
					Question.find({topic: topicCopy._id}, {"__v":0}).exec(function(err, questions){
						questions.forEach(function(question){
							let questionCopy = JSON.parse(JSON.stringify(question));
							let questionTemplate = new Question(questionCopy);
							questionTemplate._id = mongoose.Types.ObjectId();
							questionTemplate.topic = topicTemplate._id;
							questionTemplate.save();
						});

					});
				});
			});
			res.json({state: "ok"});
		});
	});
}

function validateAplication(aplication){
    return true;
}
