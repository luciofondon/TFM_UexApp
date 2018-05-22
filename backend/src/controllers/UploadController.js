var uploadService = require('../services/UploadService');

module.exports = function() {

    return {
        uploadXML: function(req, res) {
            uploadService.uploadXML(req.files.file).then(function(name){
                resolve(name);
            }).catch(function(err){
                reject(err);
            });
        },

        uploadImage: function(req, res) {
            uploadService.uploadImage(req.files.file).then(function(name){
                resolve(name);
            }).catch(function(err){
                reject(err);
            });
        }
    }
}
