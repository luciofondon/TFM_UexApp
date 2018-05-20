
var mongoose = require('mongoose'),
    _ = require('lodash'),
    mailService = require('../services/MailService'),
    systemService = require('../services/SystemService'),
	fs = require('fs'),
	path = require('path');

module.exports = {
	uploadXML: function(req, res){
		uploadXML(req, res);
	},

	uploadImage: function(tmpPath, targetPath){
		upload(false, true, tmpPath, targetPath);
	}
}


function uploadXML(req, res){
	console.log("Subiendo xml")
	var file = req.files.file;
	console.log(file)

	//Ruta temporal donde se ha almacenado el fichero
	var tmpPath = file.path;

    // Ruta donde colocaremos las imagenes
	//let target_path = '../../../frontend/images/' + file.name;
	let timeStamp = new Date().getTime();

    let targetPath = path.join(__dirname,'../../tmp/' + timeStamp + ".xml");

   	// Comprobamos que el fichero es de tipo imagen
    if (file.type.indexOf('xml')==-1){
    	res.send('El fichero que deseas subir no tiene formato xml');
    } else {
         // Movemos el fichero temporal tmp_path al directorio que hemos elegido en target_path
        fs.rename(tmpPath, targetPath, function(err) {
			if (err)
				res.status(500).json({error: "Se ha producido un error al subir la imagen"});

            // Eliminamos el fichero temporal
            fs.unlink(tmpPath, function() {
				if (err)
					res.status(500).json({error: "Se ha producido un error al subir la imagen"});
                res.json({name: file.name});
            });
         });
     }
}

function upload(isImg, isCSV, tmpPath, targetPath){
	var tmp_path = req.files.photo.path;

    // Ruta donde colocaremos las imagenes
	var target_path = './public/images/' + req.files.photo.name;

   	// Comprobamos que el fichero es de tipo imagen
    if (req.files.photo.type.indexOf('image')==-1){
        res.send('El fichero que deseas subir no es una imagen');
    } else {
         // Movemos el fichero temporal tmp_path al directorio que hemos elegido en target_path
        fs.rename(tmp_path, target_path, function(err) {
			if (err) throw err;

            // Eliminamos el fichero temporal
            fs.unlink(tmp_path, function() {
                if (err) throw err;
                res.render('upload',{message: '/images/' + req.files.photo.name,title: 'ejemplo de subida de imagen por HispaBigData'});
            });
        });
    }
}
