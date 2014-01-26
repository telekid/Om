module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        files: {
          'dist/js/dependencies.min.js':
            [
            'src/js/lib/angular.js',
            'src/js/lib/pouchdb-nightly.js',
            'src/js/lib/ui-bootstrap-tpls-0.10.0.js'
            ],
          'dist/js/app.min.js':
            [
            'src/js/app.js',
            'src/js/itemController.js',
            'src/js/config.js'
            ],
          'dist/css/style.min.css':
            [
            'src/css/bootstrap-theme.min.css',
            'src/css/bootstrap.min.css',
            'src/css/style.css'
            ]
        },
      },
    },
    
    watch: {
      scripts: {
        files: ['src/js/**.js', 'src/js/lib/**.js, src/index.html'],
        tasks: ['concat'],
      },
    },
    
    copy: {
      dist: {
        files: [{
            cwd: 'src/',
            src: 'index.html',
            dest: 'dist/',
            expand: true
        },
        {
          cwd: 'src/css/',
          src: '**',
          dest: 'dist/css/',
          expand: true
        }
        ]
      }
    }
  });

    // Load tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
//    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'copy']);
    

  };