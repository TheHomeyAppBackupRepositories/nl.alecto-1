'use strict';

const Driver = require('../../lib/Driver');
const AlectoRFSignal = require('../../lib/AlectoRFSignal');

module.exports = class extends Driver {
  static SIGNAL = AlectoRFSignal;

  async onRFInit() {
    await super.onRFInit();
    this.homey.flow
      .getActionCard('adb-17:send')
      .registerRunListener(async (args, state) => {
          return args.device.txOn()
        });
  }
};
