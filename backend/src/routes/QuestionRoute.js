
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Rutas disponibles para el objeto Question
 */

module.exports = function(app){

	var questionController = require('../controllers/QuestionController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	/**
	 * @description Ruta para leer, actualizar o eliminar una Question
	 */
	app.route('/question/:questionId')
		.get(systemMiddleware.rolOperador, questionController.readQuestion)
		.put(systemMiddleware.rolOperador, questionController.updateQuestion)
        .delete(systemMiddleware.rolOperador, questionController.deleteQuestion)

	/**
	 * @description Rutas para leer todos las Question o crear un nueva a partir del identificador de un topic
	 */
    app.route('/questions/topic/:topicId')
        .get(systemMiddleware.rolOperador, questionController.readAllByTopic)
		.post(systemMiddleware.rolOperador, questionController.createByTopic);

	app.param('questionId', questionController.loadQuestion);

}
