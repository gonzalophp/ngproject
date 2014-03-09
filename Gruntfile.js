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
                        cwd: 'src/',
                        src: ['**'],
                        dest: 'dist/',
                    }
                ]
            }
        }
    });
    
    
    
    
    grunt.registerTask('npm_modules_install', 'Install npm modules', function() {
        var async = this.async(),
            npm_modules_install = grunt.util.spawn({
                cmd: 'npm', args: [ 'install', 'bower', 'karma', 'grunt-contrib-copy'],
                opts: {stdio: 'inherit'}
            }, async);
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
    
    grunt.registerTask('uninstall', 'Remove installation' , function () {
        grunt.file.delete('dist');
        grunt.file.delete('node_modules');
        grunt.file.delete('bower_components');
    });
    
    grunt.registerTask('deploy', 'Deploy', function() {
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.task.run(['dir_structure','copy:production']);
    });
    
    grunt.registerTask('test:unit', 'Karma unit tests', function() {
       var async = this.async(),
            karma_test_runner = grunt.util.spawn({
                cmd: 'node_modules/karma/bin/karma', args: [ 'start', 'config/karma.conf.js'],
                opts: {stdio: 'inherit'}
            }, async);
    });
    
    grunt.registerTask('update', ['bower_update']);
    grunt.registerTask('install', ['npm_modules_install', 'update', 'deploy']);
};