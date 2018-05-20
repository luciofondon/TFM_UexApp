/*
* @author luciofondon
* @date 2018
*/

module.exports = function(app) {
    var rolController = require('../controllers/RolController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

    app.route('/roles')
        .get(systemMiddleware.rolAdmin, rolController.readAllRol)
        .post(systemMiddleware.rolAdmin, rolController.createRol);

    app.route('/rol/:rolId')
        .get(systemMiddleware.rolAdmin, rolController.readRol)
        .put(systemMiddleware.rolAdmin, rolController.updateRol)
        .delete(systemMiddleware.rolAdmin, rolController.deleteRol);

    app.param('rolId', rolController.loadRol);
}
