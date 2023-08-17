'use strict';

const { RFDriver } = require('homey-rfdriver');
const AlectoRFSignal = require('./AlectoRFSignal');

module.exports = class extends RFDriver {

  static SIGNAL = AlectoRFSignal;

};
