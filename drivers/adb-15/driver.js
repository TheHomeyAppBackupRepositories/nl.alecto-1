'use strict';

const Driver = require('../../lib/Driver');
const Alecto2RFSignal = require('../../lib/Alecto2RFSignal');

module.exports = class extends Driver {
  static SIGNAL = Alecto2RFSignal;

  async onRFInit() {
    await super.onRFInit();
    this.homey.flow
      .getActionCard('adb-15:send')
      .registerRunListener(async (args, state) => {
          return args.device.txOn()
        });
  }
};
