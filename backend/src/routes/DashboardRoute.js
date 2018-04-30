/*
* @author luciofondon
* @date 2018
*/

module.exports = function(app) {
    var dashboardController = require('../controllers/DashboardController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

    app.route('/dashboard')
        .get(systemMiddleware.rolConsultor, dashboardController.dataDashboard);

}
