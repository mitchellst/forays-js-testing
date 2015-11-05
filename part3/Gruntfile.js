module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! divRent JS Testing Tutorial */\n',
    // Task configuration.
    karma: {
      unit: {
        configFile: 'testing/karma.conf.js',
        singleRun: true
      }
    },
    jshint: {
      all: ['Gruntfile.js',
        'application/liveSearchAngular.js',
        'testing/liveSearchSpecFile.js',
        'testing/karma.conf.js'
      ]
    }
  });

  // Load the Plugins from NPM.
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task.
  grunt.registerTask('default', ['jshint','karma']);

};
