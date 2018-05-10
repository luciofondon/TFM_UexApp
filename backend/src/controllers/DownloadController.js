var downloadService = require('../services/DownloadService');

module.exports = function() {

    return {

        downloadCSV: function(req, res) {
           downloadService.downloadCSV();
        }

    }
}
