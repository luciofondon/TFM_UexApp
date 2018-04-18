module.exports = function(grunt){

    grunt.initConfig({
		//*******************************************************************CONFIGURACIONES CSS
		// Validar fichero CSS
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            dist   : [
                'public/dist/css/AdminLTE.css'
            ]
        },
		// Pasar de less a css
        less: {
            all  : {
                files: {
                  'app/styles/css/app.css': 'app/styles/less/app.less',
                }
            },
        },
		// Mimificar css
		cssmin: {
		  target: {
			files: {
			  'public/dist/css/app.min.css': ['app/styles/css/app.css']
			}
		  }
		},
		//Concatenar ficheros css
        concat_css: {
            files: {
                'public/dist/css/assets.css': [
                    'bower_components/bootstrap/dist/css/bootstrap.min.css',
                    'bower_components/font-awesome/css/font-awesome.min.css',
                    'bower_components/Ionicons/css/ionicons.min.css',
                    'bower_components/admin-lte/dist/css/AdminLTE.min.css',
                    'bower_components/admin-lte/dist/css/skins/skin-blue.css',
                    'bower_components/angular-loading-bar/build/loading-bar.min.css',
                    'bower_components/bootstrap-table/dist/bootstrap-table.min.css'
                ],
            },
        },
		//*******************************************************************CONFIGURACIONES JS
		uglify: { // Mimificar JavaScript
            options   : {
                mangle          : true,
                preserveComments: 'some'
            },
            production: {
                files: {
                  'public/dist/js/app.min.js':	['app/src/app.js', 'app/src/**/*.js'],
                }
            }
        },
		//Concatenar fichero JS
        concat: {
            options: {
                separator: '\n\n',
                banner   : '/*! Trabajo Fin de Master - Universidad Extremadura assets.js\n'
                + '* ================\n'
                + '* Dependencias externas de TFMUex . Este fichero\n'
                + '* incluye las librerías descargadas a traves del\n'
                + '* gestor de dependencias de frontend BOWER.\n'
                + '*\n'
                + '\n\n'
            },
            dist   : {
                src : [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/admin-lte/dist/js/adminlte.min.js',
                    'bower_components/bootstrap-table/dist/bootstrap-table.min.js', // Dependencias de Bootstrap table
                    'bower_components/bootstrap-table/dist/locale/bootstrap-table-es-ES.min.js',
                    'bower_components/bootstrap-table/dist/extensions/angular/bootstrap-table-angular.min.js',
                    'bower_components/bootstrap-table/dist/extensions/export/bootstrap-table-export.min.js',
                    'bower_components/bootstrap-table/dist/extensions/select2-filter/bootstrap-table-select2-filter.min.js',
                    'bower_components/bootstrap-table/dist/extensions/mobile/bootstrap-table-mobile.min.js',
                    'bower_components/moment/min/moment.min.js',
                    'bower_components/bootstrap-daterangepicker/daterangepicker.js',
                    'bower_components/satellizer/dist/satellizer.min.js',
                    'bower_components/amcharts/dist/amcharts/amcharts.js', // Dependencias de AmChart
                    'bower_components/amcharts/dist/amcharts/pie.js',
                    'bower_components/amcharts/dist/amcharts/serial.js',
                    'bower_components/amcharts/dist/amcharts/lang/es.js',
                    'bower_components/amcharts/dist/amcharts/themes/light.js',
                    'bower_components/amcharts/dist/amcharts/plugins/responsive/responsive.min.js',
                    'bower_components/angular-loading-bar/build/loading-bar.min.js'
                ],
                dest: 'public/js/assets.min.js'
            }
        },
		// Validar codigo JS
        jshint: {
            all: ['Gruntfile.js', 'app/src/**/*.js', 'app/src/app.js']
        },
		//*******************************************************************CONFIGURACIONES IMG
		// Mimificar imagenes y ajustar
        imagemin: {
            static: {
                files: {
                    'public/dist/image/img.png': 'src/img.png',
                }
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'public/dist/image'
                }]
            }
        },
        //*******************************************************************SISTEMA
		//Copiar ficheros/carpeta para dejarlo en el path de recursos al que puede acceder el usuario
		copy: {
			dev: {
				files: [
		      		{expand: true, src: 'favicon.ico', dest: 'public/dist/', filter: 'isFile'},
		      		{expand: true, src: 'indexDEV.html', dest: 'public/dist/', filter: 'isFile'}
				]
			},
			pro: {
				files: [
		      		{expand: true, src: 'favicon.ico', dest: 'public/dist/', filter: 'isFile'},
		      		{expand: true, src: 'indexPRO.html', dest: 'public/dist/', filter: 'isFile'}
				]
			},
		},
		// Ejecutar las tareas anteriores cuando se modifiquen algun fichero
        watch: {
            css: {
               files: ['app/styles/less/*.less'],
               tasks: ['less:all'],
               options: {
                 spawn: false,
               }
            }
		},
		// Generar documentacion interna en HTML con JSDoc
		jsdoc : {
			dist : {
				src: ['app/src/**/*.js', 'app/src/app.js', '../README.md'],
				options: {
					destination: 'DOCUMENTACION_INTERNA'
				}
			}
		}
    });



    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint')
    grunt.loadNpmTasks('grunt-contrib-concat')
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jsdoc');

    //Tareas que se lanzaran cuando se introduzca por consola $grunt, $grunt dev, $grunt pro...
    grunt.registerTask("default", ["less:all", "copy:pro"]); // "$grunt"
    grunt.registerTask("dev", ["less:all", "watch", "copy:dev"]); // "$grunt dev"
    grunt.registerTask("pro", ["less:all", "copy:pro"]); // "$grunt pro"
    grunt.registerTask("lint", ["jshint", "csslint"]); // "$grunt lint"
    grunt.registerTask("doc", ["jsdoc"]); // "$grunt doc"
};
