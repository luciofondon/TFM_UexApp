module.exports = function(grunt){

    grunt.initConfig({
        less: { // Pasar de less a css
            all  : {
                files: {
                  'app/styles/css/app.css' : 'app/styles/less/app.less',
                }
            },
        },

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

        watch: { // Ejecutar las tareas anteriores cuando se modifiquen algun fichero
            css: {
               files: ['app/styles/less/**/*.less'],
               tasks: ['less:all'],
               options: {
                 spawn: false,
               }
            }
		},
		// Generar documentacion interna en HTML con JSDoc
		jsdoc : {
			dist : {
				src: ['app/src/**/*.js', 'README.md'],
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
    grunt.registerTask("lint", ["jshint", "csslint"]); // "$grunt lint"
    grunt.registerTask("doc", ["jsdoc"]); // "$grunt doc"
};
