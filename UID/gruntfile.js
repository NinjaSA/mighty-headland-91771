'use strict';

module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass:{
            dist: {
                files:{
                    'css/main.css' : 'scss/main.scss'
                },
                sourcemap: false
            }
        },

        watch:{
            css: {
                files: ['scss/**/*.scss', 'scss/main.scss'],
                tasks: ['sass:dist']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', []);
};
