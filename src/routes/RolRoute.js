/*
* @author luciofondon
* @date 2018
*/

module.exports = function(app) {
    var rolController = require('../controllers/RolController')();

    // CRUD alarma
    app.route('/api/roles')
        .get(rolController.readAll)
        .post(rolController.create);
      
    // CRUD alarma
    app.route('/api/rol/:rolId')
        .get(rolController.read)
        .put(rolController.update)
        .delete(rolController.delete);

    app.param('rolId', rolController.loadRol);
}