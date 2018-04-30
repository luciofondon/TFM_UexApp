
module.exports = function(app){

	var answerController = require('../controllers/AnswerController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	app.route('/answers/:questionId')
		.post(systemMiddleware.rolOperador, answerController.createAnswer)


	app.route('/answer/:questionId/:answerId')
		.get(systemMiddleware.rolOperador, answerController.readAnswer)
		.put(systemMiddleware.rolOperador, answerController.updateAnswer)
		.delete(systemMiddleware.rolOperador, answerController.deleteAnswer);

	app.param('questionId', answerController.loadQuestion);

}
