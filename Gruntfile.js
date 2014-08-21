module.exports = function(grunt) {

	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    uglify: {
		    options: {
		        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		    },
		    js: {
		        src: ['app/js/game.js', 'app/js/Tower.js', 'app/js/Board.js'],
		        dest: 'build/js/build.min.js'
		    }
	    },
		express: {
		    all: {
		        options: {
		            bases: ['build'],
		            port: 8080,
		            hostname: "0.0.0.0",
		            livereload: true
		        }
		    }
		},
		watch: {
			app: {
	        	files: 'app/**/*',
	        	tasks: ['copy', 'uglify'],
		    },
		    build: {
		        files: 'build/*',
	            options: {
	                livereload: true
		        }
		    }
		},
		open: {
		    all: {
		        path: 'http://localhost:8080/index.html'
		    }
		},
		copy: {
			main: {
			    expand: true,
			    cwd: 'app/',
			    src: 'index.html',
			    dest: 'build/',
			    flatten: false
			},
			assets: {
			    expand: true,
			    cwd: 'app/',
			    src: 'assets/*',
			    dest: 'build/',
			    flatten: false
			}
		},
		compress: {
			main: {
				options: 
				{
      				archive: 'Force\ of\ Elementals.zip'
				},
				src: ['app/*'],
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-open');

	// Default task(s).
	grunt.registerTask('default', ['uglify', 'copy', 'express','open', 'watch']);
	grunt.registerTask('build', ['uglify', 'copy', 'compress']);
};