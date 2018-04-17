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
		}
	}],
  	topic: {
		type: Schema.ObjectId,
		ref: 'Topic',
		required: true
  	},
	created: {
		type: Date,
		default: Date.now
	},
	isTemplate: {
		type: Boolean,
		default: false
	}
});

questionSchema.statics.load = function(questionId, callback) {
	this.findOne({_id: questionId}).exec(callback);
};

module.exports = mongoose.model('Question', questionSchema);
