var templateMiddleware = require('../middlewares/TemplateMiddleware'),
    templateDAO = require('../DAOS/TemplateDAO');


module.exports = function(){

    return {

        loadTemplate: function(req, res, next, templateId) {
            templateMiddleware.loadTemplate(req, res, next, templateId);
        },

        read: function(req, res) {
            res.json(req.template);
        },

        readAll: function(req, res) {
            templateDAO.readAllTemplate(req,res);
        },

        create: function(req, res) {
            templateDAO.createTemplate(req,res);
        },

        update: function(req, res) {
            templateDAO.updateTemplate(req,res);
        },

        delete: function(req, res) {
            //No permitir esta opcion porque los municipios pertenencen al proyecto
            return res.status(500).json({ error: "API no disponible"});
        },

        exportData: function(req, res) {
            templateDAO.exportData(req,res);
        }


    }
}
