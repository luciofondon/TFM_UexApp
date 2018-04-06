var Template = require('../models/TemplateModel');
	Template = mongoose.model('Template');


exports.loadTemplate = function(req, res, next, templateId) {
    loadTemplate(req, res, next, templateId);
};


function loadTemplate(req, res, next, templateId) {
    Template.load(templateId, function(err, template) {
        if (err)
            return res.status(500).json({error: 'El identificador no es valido'});
        if (template == undefined)
            return res.status(500).json({error: 'El identificador no existe'});
        req.template = template;
        next();
    });
}
