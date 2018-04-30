
module.exports = function(app){

	var answerController = require('../controllers/AnswerController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	app.route('/answers/:questionId')
		.post(systemMiddleware.rolAdmin, answerController.createAnswer)

	app.route('/answer/:questionId/:answerId')
		.get(systemMiddleware.rolAdmin, answerController.readAnswer)
		.put(systemMiddleware.rolAdmin, answerController.updateAnswer)
		.delete(systemMiddleware.rolAdmin, answerController.deleteAnswer);

	app.param('questionId', answerController.loadQuestion);

}
