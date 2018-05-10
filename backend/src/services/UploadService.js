
var fs = require('fs');

exports.uploadCSV = function(tmpPath, targetPath){
	uploadCSV(true, false tmpPath, targetPath);
};

exports.uploadImage = function(tmpPath, targetPath){
	upload(false, true, tmpPath, targetPath);
};

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
