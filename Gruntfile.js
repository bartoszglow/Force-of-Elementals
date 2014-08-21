module.exports = function(grunt) {

	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    uglify: {
		    options: {
		        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
		    },
		    js: {
		        src: [
		        		'app/js/*.js',
		        	],
		        dest: 'build/js/build.js',
		    },
	    },
	});

	  // Load plugins
	  grunt.loadNpmTasks('grunt-contrib-uglify');


	  // Default task(s).
	  grunt.registerTask('default', ['uglify']);
};