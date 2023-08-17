'use strict';

const DriverDipSwitch = require('../../lib/DriverDipSwitch');
const AlectoDipSwitchRFSignal = require('../../lib/AlectoDipSwitchRFSignal');

module.exports = class extends DriverDipSwitch {
  async onRFInit() {
    await super.onRFInit();
    this.homey.flow
      .getActionCard('adb-18:send')
      .registerRunListener(async (args, state) => {
          return args.device.txOn()
        });
  }
};
