
module.exports = function(app){

	var answerController = require('../controllers/AnswerController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	app.route('/answer/:questionId')
		.get(systemMiddleware.rolOperador, answerController.read)
		.put(systemMiddleware.rolOperador, answerController.update)
        .delete(systemMiddleware.rolOperador, answerController.delete);

   /* app.route('/answers/question/:questionId')
        .get(systemMiddleware.rolAdmin, answerController.readAllByTopic)
		.post(systemMiddleware.rolAdmin, answerController.createByTopic);  */

   // app.param('questionId', answerController.loadQuestion);

}
