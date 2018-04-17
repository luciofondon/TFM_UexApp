module.exports = function(grunt){

    grunt.initConfig({
		// Pasar de less a css
        less: { 
            all  : {
                files: {
                  'app/styles/css/app.css': 'app/styles/less/app.less',
                }
            },
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
                    'bower_components/bootstrap-daterangepicker/daterangepicker.js'
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
		// Mimificar imagenes y ajustar
        imagemin: {
            static: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [{removeViewBox: false}],
                    use: [mozjpeg()] // Example plugin usage
                },
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
        }
        // Validar codigo JS
        jshint: {
            all: ['Gruntfile.js', 'public/js/**/*.js', 'src/**/*.js']
        },
        // Validar fichero CSS
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            dist   : [
                'public/dist/css/AdminLTE.css'
            ]
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
				src: ['app/src/**/*.js', '../README.md'],
				options: {
					destination: 'doc'
				}
			}
		}
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint')
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-jsdoc');

    //Tareas que se lanzaran cuando se introduzca por consola $grunt, $grunt dev, $grunt pro...
    grunt.registerTask("default", ["less:all", "watch"]); // "$grunt"
    grunt.registerTask("dev", ["less:all", "watch"]); // "$grunt dev"
    grunt.registerTask("pro", ["less:all"]); // "$grunt pro"
    grunt.registerTask("lint", ["jshint", "csslint"]); // "$grunt lint"
    grunt.registerTask("doc", ["jsdoc"]); // "$grunt doc"
}; 
