var uploadService = require('../services/UploadService');

module.exports = function() {

    return {
        uploadXML: function(req, res) {
             uploadService.uploadXML(req.project);
        },

        uploadImage: function(req, res) {
            uploadService.uploadImage(req,res);
        }
    }
}
