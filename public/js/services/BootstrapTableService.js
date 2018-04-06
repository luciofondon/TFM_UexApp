angular.module('gamma.smarthlight').factory('BootstrapTableService', function(){

	return {
		createTableSimple: function(data, nameFile, columns, filterShowClear){
			return createTableSimple(data, nameFile, columns, filterShowClear);
		},
		createTableExpandCollapseRow: function(data, nameFile, columns){
			return createTableSimple(data, nameFile, columns);
		},
		createTableTree: function(data, nameColum, nameFile, columns){
			return createTableTree(data, nameColum, nameFile, columns);
		}
	};


	function createTableTree(data, nameColum, nameFile, columns){
		var format = {
			treeShowField: nameColum,
			toolbar:"#nuevo-municipio"
		};

		var format = angular.extend(format, optionBaseBootstrapTable(data, columns, nameFile));
		return {options: format};
	}


	function createTableSimple(data, nameFile, columns, filter){
		var format = {
			toolbar:"#crear",
			filterShowClear: filter == true ? true : false,
			filter: filter == true ? true : false,
			filterControl: filter == true ? true : false
		};

		var format = angular.extend(format, optionBaseBootstrapTable(data, columns, nameFile));
		return {options: format};
	}

	// Parametros comunes para todas las tablas
	function optionBaseBootstrapTable(data, columns, nameFile){
		var optionBootstrapTable = {
			columns: columns,
			data: data,
			exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'],
			exportDataType: "all",
			exportOptions:{
				fileName: nameFile,
				ignoreColumn:[0],
				type:'pdf',
				jspdf: {
					orientation: 'l',
					format: 'a3',
					margins: {left:10, right:10, top:20, bottom:20},
					autotable: {tableWidth: 'wrap'}
				}
			},
			striped: true,
			showToggle: false,
			showExport: true,
			pagination: true,
			pageSize: 15,
			pageList: [5, 10, 15, 25, 50, 100],
			search: true,
			showColumns: true,
			minimumCountColumns: 1,
			clickToSelect: false,
			maintainSelected: true,
			mobileResponsive: true
		};

		return optionBootstrapTable;

	}
});
