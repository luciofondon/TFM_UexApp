module.exports = function(app) {
    var mediatoryController = require('../controllers/MediatoryController')();

    app.route('/mediatory/check')
        .post(systemMiddleware.rolOperador, mediatoryController.checkComunication);
        
    app.route('/mediatory/apps')
        .get(systemMiddleware.rolOperador, mediatoryController.getApps);
       
    app.route('/mediatory/projects')
        .get(systemMiddleware.rolOperador, mediatoryController.getProjects);
 

}
