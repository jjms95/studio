'use strict';

module.exports = function(grunt) {
	grunt.registerTask('status', 'Shows status of node process', ['shell:serverStatus']);
	grunt.registerTask('stop', 'Stop node process', ['shell:serverStop']);
	grunt.registerTask('start', 'Start node process', ['shell:serverStart']);
	grunt.registerTask('restart', 'Restart node process', ['stop', 'start']);
	grunt.registerTask('logs', 'Shows all logs of pm2 process', ['shell:serverLogs']);
}
