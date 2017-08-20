module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pcg: grunt.file.readJSON('package.json'),

        concat: {
            distCss: {
                options: {
                    stripBanners: {
                        block: true,
                        line: true
                    }
                },
                files: {
                    'dist/css/before-after.css': ['src/css/*.css']
                }
            },
            distJs: {
                options: {
                    stripBanners: {
                        block: true,
                        line: true
                    },
                    separator: ';'
                },
                files: {
                    'dist/js/before-after.js': ['src/js/*.js']
                }
            }
        },

        cssmin: {
            dist: {
                options: {
                    advanced: false
                },
                files: {
                    'dist/css/before-after.min.css': ['dist/css/before-after.css']
                }
            }
        },

        uglify: {
            dist: {
                options: {
                    preserveComments: false
                },
                files: {
                    'dist/js/before-after.min.js': ['dist/js/before-after.js']
                }
            }
        },

        watch: {
            dist: {
                files: ['src/css/*.css', 'src/js/*.js'],
                tasks: ['concat:distCss', 'concat:distJs', 'cssmin:dist', 'uglify:dist']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('distBeforeAfter', ['concat', 'cssmin', 'uglify']);
};