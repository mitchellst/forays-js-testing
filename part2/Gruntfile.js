/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! divRent JS Testing Tutorial */\n',
    // Task configuration.
    concat: {
      all: {
        src: ['closureStart.txt', 'script.js', 'closureEnd.txt'],
        dest: 'productionScript.js'
      }
    }
  });

  // Load the Plugins from NPM.

  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task.
  grunt.registerTask('default', ['concat']);

};
