/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){
  
    var userController = require('../controllers/UserController')();
  
    // CRUD calendario
    app.route('/api/users')
      .get(userController.readAll)
      .post(userController.create);
    
    // CRUD calendario
    app.route('/api/user/:userId')
      .get(userController.read)
      .put(userController.update)
      .delete(userController.delete);
    
    // Modificar la contrasena del usuario
    app.route('/api/user/resetPassword/:userId')
      .put(userController.resetPassword);
  
    app.route('/auth/login')
      .post(userController.login);
   
    app.param('userId', userController.loadUser);
  }