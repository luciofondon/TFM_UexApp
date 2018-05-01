/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){

    var userController = require('../controllers/UserController')(),
  		systemMiddleware = require('../middlewares/SystemMiddleware');

    // CRUD usuario
    app.route('/users')
      .get(systemMiddleware.rolAdmin, userController.readAll)
      .post(systemMiddleware.rolAdmin, userController.create);

    // CRUD usuario
    app.route('/user/:userId')
      .get(systemMiddleware.rolAdmin, userController.read)
      .put(systemMiddleware.rolAdmin, userController.update)
      .delete(systemMiddleware.rolAdmin, userController.delete);

    app.route('/user/cfg/me')
	  .get(systemMiddleware.rolConsultor, userController.me)
	  .put(systemMiddleware.rolConsultor, userController.updateMeUser);


    // Modificar la contrasena del usuario
    app.route('/user/resetPassword/:userId')
      .put(systemMiddleware.rolAdmin, userController.resetPassword);

   /* app.route('/auth/login')
      .post(userController.login);
   */
    app.param('userId', userController.loadUser);
  }
