//https://www.adictosaltrabajo.com/tutoriales/angularjs-test-unitarios/
module.exports = function (config) {
    config.set({
        basePath: './',
        files: [
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/angular/angular.min.js',
			'bower_components/angular-ui-router/release/angular-ui-router.min.js',
			'bower_components/angular-confirm/dist/angular-confirm.min.js',
			'bower_components/angular-recaptcha/release/angular-recaptcha.min.js',
			'bower_components/bootstrap/dist/js/bootstrap.min.js',
			'bower_components/admin-lte/dist/js/adminlte.min.js',
			'bower_components/satellizer/dist/satellizer.min.js',
			'bower_components/angular-loading-bar/build/loading-bar.min.js',
			'bower_components/ng-file-upload/ng-file-upload.min.js',
			'bower_components/ng-file-upload/ng-file-upload-shim.min.js',
			'bower_components/bootstrap-table/dist/bootstrap-table.min.js',
			'bower_components/bootstrap-table/dist/locale/bootstrap-table-es-ES.min.js',
			'bower_components/bootstrap-table/dist/extensions/angular/bootstrap-table-angular.min.js',
			'bower_components/bootstrap-table/dist/extensions/export/bootstrap-table-export.min.js',
			'bower_components/bootstrap-table/dist/extensions/mobile/bootstrap-table-mobile.min.js',
            'app/src/**/**.js',
            'app/src/app.js',
            'app/test/**/*.js'
        ],
        autoWatch: false,
        frameworks: ['jasmine'],
        browsers: ['Chrome', 'Firefox'],
        singleRun: true,
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
        ]
    });
};
