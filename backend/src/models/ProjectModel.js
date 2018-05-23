
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Modelo de mongoose para Project
 */

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var projectSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	key: { // Codigo del proyecto utilizado para exportar en Jira, redmine...
		type: String,
		required: true
	},
	lead: {
		type: String
	},
	type: {
		type: String
	},
	description: {
		type: String,
		required: true
	},
	creator: {
		type: Schema.ObjectId,
		ref: "User"
	},
	created: {
		type: Date,
		default: Date.now,
		required:true
	}
},
{
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

projectSchema.statics.load = function(projectId, callback){
	this.findOne({_id: projectId}).exec(callback);
};

module.exports = mongoose.model('Project', projectSchema);
