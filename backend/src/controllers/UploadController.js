var uploadService = require('../services/UploadService');

module.exports = function() {

    return {
        uploadXML: function(req, res) {
            uploadService.uploadXML(req.files.file).then(function(data){
				return res.status(200).json(data);
            }).catch(function(err){
				return res.status(500).json(err);
            });
        },

        uploadImage: function(req, res) {
            uploadService.uploadImage(req.files.file).then(function(name){
				return res.status(200).json(data);
            }).catch(function(err){
				return res.status(500).json(err);
            });
        }
    }
}
