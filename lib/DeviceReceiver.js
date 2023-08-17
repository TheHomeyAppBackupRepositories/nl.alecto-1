'use strict';

const { RFDevice } = require('homey-rfdriver');

module.exports = class extends RFDevice {

  static RX_ENABLED = true;
  static DOORBELL_TIMEOUT = 4000;

  async onRFInit() {
    await super.onRFInit();

    // Disable the alarm if it was enabled
    this.setCapabilityValue('alarm_generic', false)
      .catch(this.error);

    this.deviceTimeout = null;
  }

  async onUninit() {
    if (this.deviceTimeout) {
      this.homey.clearTimeout(this.deviceTimeout);
    }
    await super.onUninit();
  }

  async onCommandMatch(command) {
    if (command === undefined || command === null) {
      return false;
    }
    const { address } = this.getData();

    return address === command.address;
  }

  async onCommandFirst({ state }) {
    if (state === true) {
      // Only trigger the flow when the alarm is false
      if (this.getCapabilityValue('alarm_generic') === false) {
        this.triggerFlow();
      }

      await this.setCapabilityValue('alarm_generic', true)
        .catch(this.error);

      this.resetAlarm();
    }
  }

  resetAlarm() {
    if (this.deviceTimeout) {
      this.homey.clearTimeout(this.deviceTimeout);
    }

    let timeout = this.constructor.DOORBELL_TIMEOUT;

    // The ADB-12 has a setting for a different timeout
    const timeoutSetting = this.getSetting('timeout');
    if (typeof timeoutSetting === 'string') {
      timeout = Number(timeoutSetting);
    }

    if (timeout > 0) {
      this.deviceTimeout = this.homey.setTimeout(() => {
        this.setCapabilityValue('alarm_generic', false)
          .catch(this.error);
      }, timeout);
    }
  }

  /**
   *
   * Custom function to trigger the doorbell with the correct group param
   *
   * @returns {Promise<void>}
   */
  async txOn() {
    const { address } = this.getData();
    await this.driver.tx({
      address,
      state: true,
    }, { device: this });
  }

};
