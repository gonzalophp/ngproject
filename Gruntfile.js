module.exports = function (grunt) {
    
    grunt.initConfig({
        copy: {
            production: {
                files: [
                    {
                        expand:true,
                        cwd: 'bower_components/',
                        src: ['angular-route/angular-route.min.js','angular/angular.min.js'],
                        dest: 'dist/lib',
                        flatten:true
                    },
                    {
                        expand:true,
                        cwd: 'module1/src/',
                        src: ['**'],
                        dest: 'dist/module1',
                    }
                ]
            }
        }
    });

    
    grunt.registerTask('bower_update', 'Install bower components', function() {
        var async = this.async(),
            bower_update = grunt.util.spawn({
                cmd: 'bower', args: ['update'],
                opts: {stdio: 'inherit'}
            }, async);
    });

    grunt.registerTask('dir_structure', 'Create directory structure' , function () {
        grunt.file.mkdir( 'dist' );
    });

    grunt.registerTask('dir_symlink', 'Link dist/lib directory with src/lib', function() {
		var fs = require('fs');
		fs.symlink('../dist/lib/', 'module1/lib');
	});


    grunt.registerTask('uninstall', 'Remove installation' , function () {
        grunt.file.delete('dist');
        grunt.file.delete('node_modules');
        grunt.file.delete('bower_components');
    });
    
    grunt.registerTask('deploy', 'Deploy', function() {
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.task.run(['dir_structure','copy:production', 'dir_symlink']);
    });
    
    grunt.registerTask('test:unit', 'Karma unit tests', function() {
       var async = this.async(),
            karma_test_runner = grunt.util.spawn({
                cmd: 'node_modules/karma/bin/karma', args: [ 'start', 'module1/config/karma.conf.js'],
                opts: {stdio: 'inherit'}
            }, async);
    });
    
    grunt.registerTask('update', ['bower_update']);
    grunt.registerTask('install', ['update', 'deploy']);
};
