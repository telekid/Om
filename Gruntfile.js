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
            //-------- JS Dependencies --------
            'lib/angular/angular.js',
            'lib/jquery/jquery.js',
            'lib/pouchdb-bower/pouchdb-nightly.js',
            'lib/angular-route/angular-route.js',
            
            //------------ JS App -------------
            'src/services.js',
            // Controllers
            'src/controllers/ActionsController.js',
            'src/controllers/PrintController.js',
            // Bits and pieces
            'src/filters.js',
            'src/directives.js',
            'src/config.js',

            'src/app.js',
            
            // Config
            'config.js'
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
        files: ['src/**/**.js', 'src/**/**.html'],
        tasks: ['concat', 'copy', 'notify:watch'],
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
    },

    notify: {
      watch: {
        options: {
//        title: 'Something Useful',
          message: 'Ready for refresh',
        }
      }
    }

  });

    // Load tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-notify');

    // Default task(s).
    grunt.registerTask('default', ['bower', 'concat', 'copy']);
    

  };