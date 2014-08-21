module.exports = function(grunt) {

	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    uglify: {
		    options: {
		        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		    },
		    js: {
		        src: 'app/js/*.js',
		        dest: 'build/js/build.js'
		    }
	    },
		watch: {
		  	js: {
				files: [
						'app/js/**/*.js',
		 		],
				options: { livereload: true }
	  		},
		  	html: {
		  		files: [
		  				'app/**/*.html', 
		  		],
				options: { livereload: true }
		  	}
		},
		copy: {
			main: {
			    expand: true,
			    cwd: 'app/',
			    src: [
			    		'index.html'
			    ],
			    dest: 'build/',
			    flatten: false
			}
		}
	});

	  // Load plugins
	  grunt.loadNpmTasks('grunt-contrib-uglify');
	  grunt.loadNpmTasks('grunt-contrib-watch');
	  grunt.loadNpmTasks('grunt-contrib-copy');


	  // Default task(s).
	  grunt.registerTask('default', ['copy', 'uglify', 'watch']);
};