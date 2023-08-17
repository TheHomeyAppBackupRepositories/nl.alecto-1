'use strict';

const DeviceReceiver = require('../../lib/DeviceReceiver');

module.exports = class extends DeviceReceiver {
  triggerFlow() {
    this.homey.flow
      .getDeviceTriggerCard('adb-18:received')
      .trigger(this)
      .catch(this.error);
  }

  /**
   *
   * Custom function to trigger the doorbell with the correct group param
   *
   * @returns {Promise<void>}
   */
  async txOn() {
    // add the sound here
    const { address } = this.getData();
    const sound = this.getSetting('sound');

    await this.driver.tx({
      address,
      sound,
      state: true,
    }, { device: this });
  }
};

