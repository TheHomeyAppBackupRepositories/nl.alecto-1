'use strict';

const DeviceReceiver = require('../../lib/DeviceReceiver');

module.exports = class extends DeviceReceiver {
  triggerFlow() {
    this.homey.flow
      .getDeviceTriggerCard('adb-15:received')
      .trigger(this)
      .catch(this.error);
  }
};

