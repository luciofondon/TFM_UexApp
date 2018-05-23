
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Modelo de mongoose para Topic
 */

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var topicSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	aplication: {
		type: Schema.ObjectId,
		ref: 'Aplication',
		required: true,
	},
	created: {
		type: Date,
		default: Date.now
	}
},
{
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

topicSchema.statics.load = function(topicId, callback) {
	this.findOne({_id: topicId}).exec(callback);
};

module.exports = mongoose.model('Topic', topicSchema);
