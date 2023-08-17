'use strict';

const {
  RFSignal, RFUtil, RFError,
} = require('homey-rfdriver');

module.exports = class extends RFSignal {

  static FREQUENCY = '433';
  static ID = 'alecto-dipswitch';

  static commandToDeviceData(command) {
    return {
      address: command.address,
      sound: command.sound,
    };
  }

  static commandToPayload({
    address,
    sound,
    state,
  }) {
    if (typeof address !== 'string' || address.length !== 16) {
      throw new RFError(`Invalid Address: ${address}`);
    }

    if (typeof sound !== 'string' || sound.length !== 8) {
      throw new RFError(`Invalid Sound: ${sound}`);
    }

    return [].concat(
      RFUtil.bitStringToBitArray(address),
      RFUtil.bitStringToBitArray(sound),
    );
  }

  static payloadToCommand(payload) {
    if (payload.length === 24) {
      const data = {
        address: RFUtil.bitArrayToString(payload.slice(0, 16)),
        sound: RFUtil.bitArrayToString(payload.slice(16, 24)),
        state: true,
      };
      data.id = data.address;
      return data;
    }
    return null;
  }

  static createPairCommand() {
    const data = {
      address: RFUtil.generateRandomBitString(24),
      state: false,
    };
    data.id = data.address;
    return data;
  }

  /**
   * Converts the dipswitches to a valid address and unit
   *
   * @param dipswitches
   * @returns {{unit: *, address: *, state: boolean}}
   */
  static createDipswitchCommand(dipswitches) {
    if (dipswitches.length === 1) {
      if (dipswitches[0].length === 4) {
        dipswitches[0].push(false, false); // add two virtual dipswitches to keep the signal equal to a 6 bit address
      }
    }

    const data = {
      address: `${dipswitches.reduce((result, next) => result += next ? '00' : '01', '')}0101`,
      sound: '11000000',
      state: false,
    };
    data.id = data.address;
    return data;
  }

};
