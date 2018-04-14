/*
* @author luciofondon
* @date 2018
*/

module.exports = function(app) {
    var dashboardController = require('../controllers/DashboardController')();

    app.route('/dashboard')
        .get(dashboardController.dataDashboard);

}