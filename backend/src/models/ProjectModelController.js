module.exports = {

	readProject: function(projecId) {
		this.findOne({_id: projectId}).exec(function(project){
			return project;
		});
	},

	readAllProjects: function(){
		this.find({}).exec(function(projects){
			return projects;
		});
	},

	createProject: function(project) {
		let error = validateProject(project)
		if(error == null){

		}else{
			return res.status(500).json({ error: error});
		}
	},

	updateProject: function(project) {
		let error = validateProject(project)
		if(error == null){
			project.save(function(err){
				if (err) {
					return res.status(500).json({error: 'Cannot update the project'});
				}
				return project;
			});
		}else{
			return res.status(500).json({ error: error});
		}
	},

	deleteProject: function(project) {

	}
};


function validateProject(project){
	let error = null;
	if(project.name == undefined || project.name == "")
		error = "El campo nombre de proyecto es obligatorio";
	else if(project.key == undefined || project.key == "")
		error = "El campo nombre de proyecto es obligatorio";
	else if(project.description == undefined || project.description == "")
		error = "El campo nombre de proyecto es obligatorio";
    return error;
}
