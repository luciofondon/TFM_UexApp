/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){
	/*var multiparty = require('connect-multiparty'),
		multipartyMiddleware = multiparty();*/

    var userController = require('../controllers/UserController')(),
  		systemMiddleware = require('../middlewares/SystemMiddleware');

    // CRUD usuario
    app.route('/users')
			.get(systemMiddleware.rolAdmin, userController.readAllUser)
		.post(systemMiddleware.rolAdmin, userController.createUser);

    // CRUD usuario
    app.route('/user/:userId')
		.get(systemMiddleware.rolAdmin, userController.readUser)
		.put(systemMiddleware.rolAdmin, userController.updateUser)
		.delete(systemMiddleware.rolAdmin, userController.deleteUser);

    app.route('/user/cfg/me')
	  	.get(systemMiddleware.rolConsultor, userController.me)
	  	.put(systemMiddleware.rolConsultor, userController.updateMeUser);


    // Modificar la contrasena del usuario
    app.route('/user/resetPassword/:userId')
      	.put(systemMiddleware.rolAdmin, userController.resetPasswordUser);
 
    /*app.route('/user/upload')
    	.post(multipartyMiddleware, userController.uploadImageUser);
*/
    app.param('userId', userController.loadUser);
  }
