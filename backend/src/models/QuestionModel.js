var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var questionSchema = new Schema({
	description: {
    	type: String,
    	required: true
  	},
	answers:[{
		description: {
		  	type: String
		},
		requirement: {
			type: String
		},
		questions: {
			type: Schema.ObjectId,
			ref: 'Question',
  		},
	}],
  	topic: {
		type: Schema.ObjectId,
		ref: 'Topic',
		required: true
  	},
	created: {
		type: Date,
		default: Date.now
	}
});

questionSchema.statics.load = function(questionId, callback) {
	this.findOne({_id: questionId}).exec(callback);
};

module.exports = mongoose.model('Question', questionSchema);
