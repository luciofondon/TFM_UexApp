/*
* @author luciofondon
* @date 2018
*/

module.exports = function(app) {
    var rolController = require('../controllers/RolController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

    // CRUD alarma
    app.route('/roles')
        .get(systemMiddleware.rolAdmin, rolController.readAll)
        .post(systemMiddleware.rolAdmin, rolController.create);
      
    // CRUD alarma
    app.route('/rol/:rolId')
        .get(systemMiddleware.rolAdmin, rolController.read)
        .put(systemMiddleware.rolAdmin, rolController.update)
        .delete(systemMiddleware.rolAdmin, rolController.delete);

    app.param('rolId', rolController.loadRol);
}
