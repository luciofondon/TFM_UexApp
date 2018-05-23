
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Rutas disponibles obtener la informacion del dashboard
 */

module.exports = function(app) {
    var dashboardController = require('../controllers/DashboardController')(),
		    systemMiddleware = require('../middlewares/SystemMiddleware');

    app.route('/dashboard')
        .get(systemMiddleware.rolConsultor, dashboardController.dataDashboard);

}
