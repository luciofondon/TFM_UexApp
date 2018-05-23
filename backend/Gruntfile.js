module.exports = function(grunt){

    grunt.initConfig({
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


    grunt.loadNpmTasks('grunt-jsdoc');

    //Tareas que se lanzaran cuando se introduzca por consola $grunt, $grunt dev, $grunt pro...
    grunt.registerTask("doc", ["jsdoc"]); // "$grunt doc"
};
