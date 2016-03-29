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
            },
            js:{
                files: ['js/vendor/*.js', 'js/app/**/*.js'],
                tasks: ['uglify']
            }
        },

        uglify: {
            build: {
                options: {
                    screwIE8: true
                },
                files: {
                    'js/master.min.js' : [
                        'js/vendor/angular.min.js',
                        'js/vendor/*.js',
                        'js/app/app.js',
                        'js/app/app.config.js',
                        'js/app/*/*.js'
                    ]
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', []);
};
