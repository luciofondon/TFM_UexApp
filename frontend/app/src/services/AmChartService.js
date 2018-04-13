angular.module('tfm.uex').service('AmChartService', function() {

	return {
		createChartSerial: function(data, formatItem, divId, titleHead, nameFile, periodo){
			return createChartSerial(data, formatItem, divId, titleHead, nameFile, periodo);
		},
		createCharPie: function(data, divId, nameFile){
			return createCharPie(data, divId, nameFile);
		}
	};

	function createCharPie(data, divId, nameFile){
		var optionChartPie = {
			"balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
			"titleField": "category",
			"valueField": "column-1",
			"legend": {
				"enabled": true,
				"align": "center",
				"markerType": "circle"
			},
			"type": "pie", // Tipo de grafico de barra
			"dataDateFormat": "DD/MM/YYYY", // Formato fecha
			"dataProvider": data
		};

		var chart = AmCharts.makeChart(divId, angular.extend(optionChartPie, optionBaseAmChart(nameFile)));

		return chart;
	}

	//Grafico de barras
	function createChartSerial(data, formatItem, divId, titleHead, nameFile, periodo){

		var optionChartSerial =  {
			"type": "serial",
			"titles":[{"text":titleHead}],
			"marginTop":0,
			"dataProvider": data,
			"graphs": formatItem,
			"chartScrollbar": {
				"enabled": true
			},
			"chartCursor": {
				"categoryBalloonEnabled": false,
				"cursorAlpha": 0,
			},
			"valueAxes": [{
				"axisAlpha": 0,
				"labelsEnabled": false
			}],
			"categoryField": "_id", // Campo del json que indica las diferentes columnas existentes
			"categoryAxis": {
				"gridPosition": "start",
				"minPeriod": periodo, //Los peridos son dias (DD), horas (hh), minutos (mm)
				"parseDates": true,
				"autoRotateAngle": 39.6, // Rotar leyenda
				"autoRotateCount": 1,
			}
		};
		var chart = AmCharts.makeChart(divId, angular.extend(optionChartSerial, optionBaseAmChart(nameFile)));

		chart.handleResize();

		return chart;

	}

	// Parametros comunes para todos los graficos
	function optionBaseAmChart(nameFile){
		var optionAmChart = {
			"startDuration": 1, // Efecto de aparicion saltando
			"depth3D": 30, // Activar el 3D
			"angle": 30, // Angulo de giro del 3D
			"pathToImages": "bower_components/amcharts/dist/amcharts/images/",
			"path": "http://www.amcharts.com/lib/3/",
			//"dataDateFormat": "DD/MM/YYYY", // Formato fecha
			"color": "#1E9CBE", // Color de la letra de leyenda, de link de amchart...
			"colors": [
				"#00cabe",
				"#ff9500",
				"#1e9cbe",
				"#e57700",
				"#16728b",
				"#e8a30c",
				"#92d3ca",
				"#ff540d",
				"#0000CC",
				"#DDDDDD",
				"#999999",
				"#333333",
				"#990000"
			],
			"theme": "light",
			"language": "es",
			/*"responsive": {
				"enabled": true
			},*/
			"numberFormatter": {
				"precision": 2,
				"decimalSeparator": ",",
				"thousandsSeparator": ""
			},
			"fontFamily": "Arial",
			"export":{
				"enabled": true,
				'position': 'bottom-right',
				"exportTitles": true,
				"fileName": nameFile,
				"columnNames": {
					"_id": "Fecha"
				},
				"menu": [ {
					"class": "export-main",
					"menu": [ {
						"label": "Descargar en...",
						"menu":
						[ "PNG",
						"JPG",
						"SVG",
						"PDF",
						{label:"CSV" , click: function(){exportData("CSV");}},
						{label:"XLSX" , click: function(){exportData("XLSX");}}]
					}, {
						"label": "Dibujar",
						"action": "draw",
						"menu": [ {
						"class": "export-drawing",
						"menu": [ "PNG", "JPG" ]
						} ]
					}, {
						"label": "Imprimir",
						"action": "print",
						"format": "PRINT"
					}]
				}]
			}
		};
		return optionAmChart;
	}

});
