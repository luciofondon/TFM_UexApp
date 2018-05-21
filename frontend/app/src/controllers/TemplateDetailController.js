angular.module('tfm.uex').controller('TemplateDetailController',
    ['$stateParams', 'templateData', '$ngConfirm', 'TopicService',
        function($stateParams, templateData, $ngConfirm, TopicService){
	var td = this;
    td.tab = 0; //Tab que se mostrara en la vista
    td.topics = [];
	td.project = templateData.data;
    td.topicId = ""; //Pestana de topic seleccionada
	console.log(td.project)

    TopicService.getTopics($stateParams.templateId).then(function(response) {
        td.topics = response.data;
    });

    td.setTab = function(newTab){
        td.tab = newTab;
    };

    td.isSet = function(tabNum){
        return td.tab === tabNum;
	};

	TopicService.getTopics($stateParams.templateId).then(function(response) {
		console.log(response.data)
		td.topics = response.data;
		if(td.topics.length > 0)
			td.topicId = $scope.topics[0]._id;
	}).catch(function(err){
		$ngConfirm(err)
	});


}]);
