module.exports = function(config){
  config.set({
    basePath : '..',
    files : [
      //frameworks first (and angular before ng-mocks)
      'application/dependencies/angular.min.js',
      'testing/angular-mocks.js',
      'application/dependencies/underscore-min.js',

      // then application code
      'application/liveSearchAngular.js',

      // then spec files
      'testing/testingdata.js',
      'testing/liveSearchSpecFile.js'

    ],

    autoWatch : false, // grunt can take care of this.

    frameworks : ['jasmine'],

    browsers : ['PhantomJS'],

    reporters: ['progress'], //this is a default.

    plugins :  [ // like grunt, karma needs these.
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-phantomjs-launcher'
    ]

  });};
