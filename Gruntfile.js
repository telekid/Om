module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),    

    bower: {
      install: {
         //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
         options: {
           cleanBowerDir: true
         }
      }
    },
    
    concat: {
      dist: {
        files: {
          'dist/js/app.min.js': [
            // JS Library
            'lib/angular/angular.js',
            'lib/jquery/jquery.js',
            'lib/pouchdb-bower/pouchdb-nightly.js',
            'lib/angular-route/angular-route.js',
            
            // JS App
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
        files: ['src/js/**.js', 'src/partials/**.html', 'src/index.html'],
        tasks: ['concat', 'copy'],
      },
    },
    
    copy: {
      dist: {
        files: [
          {
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
          },
          {
            cwd: 'src/partials/',
            src: '**',
            dest: 'dist/partials/',
            expand: true
          }
        ]
      }
    }
  });

    // Load tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');

    // Default task(s).
    grunt.registerTask('default', ['bower', 'concat', 'copy']);
    

  };