var downloadService = require('../services/DownloadService');

module.exports = function() {

    return {

        downloadFile: function(req, res) {
           downloadService.downloadFile(req, res);
        }

    }
}
