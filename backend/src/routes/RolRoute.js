
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Rutas disponibles para el objeto Rol
 */

module.exports = function(app) {
    var rolController = require('../controllers/RolController')(),
        systemMiddleware = require('../middlewares/SystemMiddleware');
        
    /**
	 * @description Rutas para leer todos los roles o crear un nuevo rol
	 */
    app.route('/roles')
        .get(systemMiddleware.rolAdmin, rolController.readAllRol)
        .post(systemMiddleware.rolAdmin, rolController.createRol);
    
    /**
	 * @description Ruta para leer, actualizar o eliminar un rol
	 */
    app.route('/rol/:rolId')
        .get(systemMiddleware.rolAdmin, rolController.readRol)
        .put(systemMiddleware.rolAdmin, rolController.updateRol)
        .delete(systemMiddleware.rolAdmin, rolController.deleteRol);

    app.param('rolId', rolController.loadRol);
}
