module.exports = function(grunt){

    grunt.initConfig({
        uglify: { // Mimificar JavaScript
            options   : {
                mangle          : true,
                preserveComments: 'some'
            },
            production: {
                files: {
                  'public/dist/js/adminlte.min.js'          : ['public/dist/js/adminlte.js'],
                  'public/dist/js/scripts.min.js'           : ['public/js/**/*.js'],
                  'public/dist/js/demo.min.js'              : ['public/build/js/demo.js']
                }
            }
        },
        imagemin: { // Todas las imagenes del proyecto llevar a una misma carpeta y optimizarla
            main: {
                files: [{
                   expand: true,
                   cwd: 'public/assets/img/',
                   src: ['**/*.{png,jpg,gif,svg,jpeg}'],
                   dest: 'public/dist//img/'
                }]
            }
        },

        less: { // Pasar de less a css
            development  : {
                files: {
                  'public/dist/css/AdminLTE.css'        : 'public/build/less/AdminLTE.less',
                }
            },

            production   : {
                options: { // Mimificar css en produccion
                  compress: true
                },
                files  : {
                  'public/dist/css/AdminLTE.min.css'    : 'public/build/less/AdminLTE.less',
                }
            },
            skins        : {
                files: {
                  'public/dist/css/skins/skin-blue.css'        : 'public/build/less/skins/skin-blue.less',
                  'public/dist/css/skins/skin-black.css'       : 'public/build/less/skins/skin-black.less',
                  'public/dist/css/skins/skin-yellow.css'      : 'public/build/less/skins/skin-yellow.less',
                  'public/dist/css/skins/skin-green.css'       : 'public/build/less/skins/skin-green.less',
                  'public/dist/css/skins/skin-red.css'         : 'public/build/less/skins/skin-red.less',
                  'public/dist/css/skins/skin-purple.css'      : 'public/build/less/skins/skin-purple.less',
                  'public/dist/css/skins/skin-blue-light.css'  : 'public/build/less/skins/skin-blue-light.less',
                  'public/dist/css/skins/skin-black-light.css' : 'public/build/less/skins/skin-black-light.less',
                  'public/dist/css/skins/skin-yellow-light.css': 'public/build/less/skins/skin-yellow-light.less',
                  'public/dist/css/skins/skin-green-light.css' : 'public/build/less/skins/skin-green-light.less',
                  'public/dist/css/skins/skin-red-light.css'   : 'public/build/less/skins/skin-red-light.less',
                  'public/dist/css/skins/skin-purple-light.css': 'public/build/less/skins/skin-purple-light.less',
                  'public/dist/css/skins/_all-skins.css'       : 'public/build/less/skins/_all-skins.less'
                }
              },
              // Skins minified
              minifiedSkins: {
                options: {
                  compress: true
                },
                files  : {
                  'public/dist/css/skins/skin-blue.min.css'        : 'public/build/less/skins/skin-blue.less',
                  'public/dist/css/skins/skin-black.min.css'       : 'public/build/less/skins/skin-black.less',
                  'public/dist/css/skins/skin-yellow.min.css'      : 'public/build/less/skins/skin-yellow.less',
                  'public/dist/css/skins/skin-green.min.css'       : 'public/build/less/skins/skin-green.less',
                  'public/dist/css/skins/skin-red.min.css'         : 'public/build/less/skins/skin-red.less',
                  'public/dist/css/skins/skin-purple.min.css'      : 'public/build/less/skins/skin-purple.less',
                  'public/dist/css/skins/skin-blue-light.min.css'  : 'public/build/less/skins/skin-blue-light.less',
                  'public/dist/css/skins/skin-black-light.min.css' : 'public/build/less/skins/skin-black-light.less',
                  'public/dist/css/skins/skin-yellow-light.min.css': 'public/build/less/skins/skin-yellow-light.less',
                  'public/dist/css/skins/skin-green-light.min.css' : 'public/build/less/skins/skin-green-light.less',
                  'public/dist/css/skins/skin-red-light.min.css'   : 'public/build/less/skins/skin-red-light.less',
                  'public/dist/css/skins/skin-purple-light.min.css': 'public/build/less/skins/skin-purple-light.less',
                  'public/dist/css/skins/_all-skins.min.css'       : 'public/build/less/skins/_all-skins.less'
                }
            }
        },

        //Concatenar fichero JS
        concat: {
            options: {
                separator: '\n\n',
                banner   : '/*! AdminLTE app.js\n'
                + '* ================\n'
                + '* Main JS application file for AdminLTE v2. This file\n'
                + '* should be included in all pages. It controls some layout\n'
                + '* options and implements exclusive AdminLTE plugins.\n'
                + '*\n'
                + '\n\n'
            },
            dist   : {
                src : [
                    'public/build/js/BoxRefresh.js',
                    'public/build/js/BoxWidget.js',
                    'public/build/js/ControlSidebar.js',
                    'public/build/js/DirectChat.js',
                    'public/build/js/Layout.js',
                    'public/build/js/PushMenu.js',
                    'public/build/js/TodoList.js',
                    'public/build/js/Tree.js'
                ],
                dest: 'public/dist/js/adminlte.js'
            }
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
            scripts: {
               files: ['public/js/**/*.js', 'public/SystemController.js'],
               tasks: ['uglify:production'],
               options: {
                 spawn: false,
               }
            },
            images: {
                files: ['public/assets/img/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    spawn: false,
                }

            }
		},
		// Generar documentacion interna en HTML con JSDoc
		jsdoc : {
			dist : {
				src: ['src/**/*.js', 'README.md'],
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
    grunt.registerTask("default", ["uglify:production", "watch"]); // "$grunt"
    grunt.registerTask("dev", ["less:development", "concat", "uglify:production", "imagemin", 'less:skins', 'less:minifiedSkins']); // "$grunt dev"
    grunt.registerTask("pro", ["less:production", "concat", "uglify:production", 'less:skins', 'less:minifiedSkins']); // "$grunt pro"
    grunt.registerTask("lint", ["jshint", "csslint"]); // "$grunt lint"
    grunt.registerTask("doc", ["jsdoc"]); // "$grunt doc"

};
