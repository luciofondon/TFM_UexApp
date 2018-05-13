
var path = require('path');

exports.downloadFile = function(req, res){
    downloadFile(req, res);
};

function downloadFile(req, res){
	console.log("Nombre " + req.params.nameFile)
	let targetPath = path.join(__dirname,'../../tmp/' + req.params.nameFile);
	console.log(targetPath)
	res.download(targetPath, req.params.nameFile);
}
