
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Rutas disponibles para el objeto User
 */

module.exports = function(app){
	
    var userController = require('../controllers/UserController')(),
  		systemMiddleware = require('../middlewares/SystemMiddleware');

   	/**
	 * @description Rutas para leer todos los usuarios o crear uno nuevo
	 */
    app.route('/users')
		.get(systemMiddleware.rolAdmin, userController.readAllUser)
		.post(systemMiddleware.rolAdmin, userController.createUser);

    /**
	 * @description Ruta para leer, actualizar o eliminar un usuario
	 */
    app.route('/user/:userId')
		.get(systemMiddleware.rolAdmin, userController.readUser)
		.put(systemMiddleware.rolAdmin, userController.updateUser)
		.delete(systemMiddleware.rolAdmin, userController.deleteUser);

  	/**
	 * @description Rutas para leer el propio usuario que esta logueado o actualizar sus datos
	 */
    app.route('/user/cfg/me')
	  	.get(systemMiddleware.rolConsultor, userController.me)
	  	.put(systemMiddleware.rolConsultor, userController.updateMeUser);

	/**
	 * @description Modificar la contrasena del usuario
	 */
    app.route('/user/resetPassword/:userId')
      	.put(systemMiddleware.rolAdmin, userController.resetPasswordUser);
 
	app.param('userId', userController.loadUser);
	
}
