'use strict';

module.exports = function() {
	return {
		name: process.env.MODE_ENV ? process.env.MODE_ENV : 'production'
	};
};
