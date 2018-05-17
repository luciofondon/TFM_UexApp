angular.module('tfm.uex').service('AmChartService', [function() {

	return {
	/*	createChartSerial: function(data, formatItem, divId, divLengend, titleHead, nameFile, periodo){
			return createChartSerial(data, formatItem, divId, divLengend, titleHead, nameFile, periodo);
		},
		createCharPie: function(data, divId, nameFile, legend){
			return createCharPie(data, divId, nameFile, legend);
		},*/
		createCharPieDonut: function(data, totalData, divId, title, nameFile){
			return createCharPieDonut(data, totalData, divId, title, nameFile);
		}
	};

	/**
	 *
	 * @param {*} data
	 * @param {*} totalData Elemento que se desea pintar en el medio del donut
	 * @param {*} divId
	 * @param {*} title
	 * @param {*} nameFile
	 */
	function createCharPieDonut(data, totalData, divId, title, nameFile){
		var optionChartPie = {
			"balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
			"titleField": "category",
			"valueField": "total",
			"labelText": "",
			"innerRadius": "50%", //Circulo del medio
			"pullOutRadius": 10, // Grosor del donut
			"legend": {
				"enabled": false,
				"align": "center",
				"markerType": "circle"
			},
			"type": "pie", // Tipo de grafico de barra
			"dataDateFormat": "DD/MM/YYYY", // Formato fecha
			"dataProvider": data,
			"titles": [{
				"text": title
			}],
			"allLabels": [{
							"y": "54%",
							"align": "center",
							"size": 15,
							"bold": true,
							"text": totalData,
							"color": "#555"
						}
			]
		};

		var chart = AmCharts.makeChart(divId, angular.extend(optionChartPie, optionBaseAmChart(nameFile)));

		return chart;
	}


	// Parametros comunes para todos los graficos
	function optionBaseAmChart(nameFile){
		var optionAmChart = {
			"startDuration": 1, // Efecto de aparicion saltando
			//"depth3D": 30, // Activar el 3D
			//"angle": 30, // Angulo de giro del 3D
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
					"date": "Fecha"
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

/*
	function createCharPie(data, divId, nameFile, legend){
		var optionChartPie = {
			"balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
			"titleField": "category",
			"valueField": "total",
			"labelText": "",
			"legend": {
				"enabled": legend,
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

	/**
	 * @description Grafico de barras y de lineas
	 * @param {*} data
	 * @param {*} formatItem
	 * @param {*} divId Elemento html donde se inyectara el grafico
	 * @param {*} divLengend Elemento html donde se inyectara la leyenda del grafico
	 * @param {*} titleHead Titulo del grafico
	 * @param {*} nameFile Nombre del fichero para descargar el grafico
	 * @param {*} periodo Formato de la barra horizontal para marcar las fechas de los elementos ( dias - DD, horas - hh, minutos - mm)

	function createChartSerial(data, formatItem, divId, divLengend, titleHead, nameFile, periodo){
		generateAxes(function(axes){
			var optionChartSerial =  {
				"type": "serial",
				"titles":[{"text":titleHead}],
				"marginTop":10, //Separacion de la grafica con el titulo
				"dataProvider": data,
				"graphs": formatItem,
				"chartScrollbar": {
					"enabled": true,
					"scrollbarHeight":2,
					"offset":-1,
					"backgroundAlpha":0.1,
					"backgroundColor":"#888888",
					"selectedBackgroundColor":"#67b7dc",
					"selectedBackgroundAlpha":1
				},
				"chartCursor": {
					"categoryBalloonEnabled": false,
					"cursorAlpha": 0,
				},
				"categoryField": "date", // Campo del json que indica las diferentes columnas existentes
				"categoryAxis": {
					"gridPosition": "start",
					"minPeriod": periodo, //Los peridos son dias (DD), horas (hh), minutos (mm)
					"parseDates": true,
					"autoRotateAngle": 39.6, // Rotar leyenda
					"autoRotateCount": 1,
				},
				"legend": {
					"enabled": true,
					"useGraphSettings": false, //false -> Indicar al div donde mostrar la leyenda
					"divId": divLengend
				},
				"valueAxes": ejes(formatItem)
			};

			var chart = AmCharts.makeChart(divId, angular.extend(optionChartSerial, optionBaseAmChart(nameFile)));
			AmCharts.useUTC = true;

			AmCharts.checkEmptyData = function (chart) {
				if ( 0 == chart.dataProvider.length ) {
					chart.addLabel('0', '50%', 'No existen datos para mostrar. Por favor, modifique los criterios de búsqueda.', 'center');
					chart.validateNow();
				}
			};

			AmCharts.checkEmptyData(chart);

			chart.handleResize();

			return chart;
		});

	}

	function ejes(formatItem){
		var units = ["V", "A", "KW/h", "KVA", "KW", "KVAr/h", "KVAr", "KWH"];
		var ejes = [];
		let position = "";
		let exist = false;
		formatItem.forEach(function(item, index){
			let exist = false;

			for (let i = 0; i < ejes.length; i++) {
				if (ejes[i].id === item.valueAxis){
					exist = true;
				}
			}
			if(!exist){
				if(index % 2 == 0)
					position = "left";
				else
					position = "right";

				for (let i = 0; i < units.length; i++){
					if(item.valueAxis )
					if(units[i] == item.valueAxis){
						ejes.push({
							"id": units[i], // Sirve para relacionarlo con el valueAxis
							"position": position, // Colocar a la izquierda o a la derecha
							"axisThickness": 2,
							"axisAlpha": 1,
							"title": units[i], // Es el nombre que se muestra en la gráfica
							"axisColor": "#00cabe",
							"offset": 0 // Separacion lateral de la grafica (utilizar para no sobreponer escalas)
						});
					} else if(units[i] + "0" == item.valueAxis){
						ejes.push({
							"id": units[i] + "0", // Sirve para relacionarlo con el valueAxis
							"position": position, // Colocar a la izquierda o a la derecha
							"axisThickness": 2,
							"axisAlpha": 1,
							"title": units[i], // Es el nombre que se muestra en la gráfica
							"axisColor": "#00cabe",
							"offset": 0, // Separacion lateral de la grafica (utilizar para no sobreponer escalas)
							"minimum": 0 //Para que la escala empiece desde 0
						});
					}else if(units[i] + "Avg" == item.valueAxis){
						ejes.push({
							"id": units[i] + "Avg", // Sirve para relacionarlo con el valueAxis
							"position": position, // Colocar a la izquierda o a la derecha
							"axisThickness": 2,
							"axisAlpha": 1,
							"title": units[i], // Es el nombre que se muestra en la gráfica
							"axisColor": "#00cabe",
							"offset": 0, // Separacion lateral de la grafica (utilizar para no sobreponer escalas)
							"guides": [{
								"dashLength": 3,
								"inside": true,
								"label": "Promedio",
								"lineAlpha": 1,
								"value": item.avg,
								"lineColor": "#FF0000",
								"color": "#FF0000",
								"boldLabel": true,
								"fontSize": 14,
								"position": "right"
							}]
						});
					}
				}
			}
		});
		return ejes;
	}
	// Generar todos los valores para las escalas de la grafica
	function generateAxes(callback){
		var axes = [];
		MeterDataService.getVarsMeter().then(function(response){
			var varsMeter = [];
			response.data.forEach(function(item){
				if(varsMeter.includes(item.unit) == false && item.unit != ""){
					varsMeter.push(item.unit);
				}
			});
			varsMeter.forEach(function(item){
				axes.push({
					"id": item, // Sirve para relacionarlo con el valueAxis
					"position": "left", // Colocar a la izquierda o a la derecha
					"axisThickness": 2,
					"axisAlpha": 1,
					"title": "V", // Es el nombre que se muestra en la gráfica
					"axisColor": "#00cabe",
					"offset": 0, // Separacion lateral de la grafica (utilizar para no sobreponer escalas)
				});
				axes.push({ // Creamos uno que empiece con la escala en 0
					"id": item + "0", // Sirve para relacionarlo con el valueAxis
					"position": "left", // Colocar a la izquierda o a la derecha
					"axisThickness": 2,
					"axisAlpha": 1,
					"title": "V", // Es el nombre que se muestra en la gráfica
					"axisColor": "#00cabe",
					"offset": 0, // Separacion lateral de la grafica (utilizar para no sobreponer escalas)
					"minimum": 0 //Para que la escala empiece desde 0
				});

			});
			return callback(axes);
		});
	}

	// Parametros comunes para todos los graficos
	function optionBaseAmChart(nameFile){
		var optionAmChart = {
			"startDuration": 1, // Efecto de aparicion saltando
			//"depth3D": 30, // Activar el 3D
			//"angle": 30, // Angulo de giro del 3D
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
			},
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
					"date": "Fecha"
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
	}*/

}]);
