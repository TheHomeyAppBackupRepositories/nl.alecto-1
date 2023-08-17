'use strict';

const Homey = require('homey');

class Alecto extends Homey.App {
	onInit() {
		this.log('Alecto is running...');
	}
}

module.exports = Alecto;