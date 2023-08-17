'use strict';

const {
  RFSignal, RFUtil, RFError,
} = require('homey-rfdriver');

module.exports = class extends RFSignal {

  static FREQUENCY = '433';
  static ID = 'alecto';

  static commandToDeviceData(command) {
    return {
      address: command.address,
    };
  }

  static commandToPayload({
    address,
    state,
  }) {
    if (typeof address !== 'string' || (address.length !== 17 && address.length !== 24)) {
      throw new RFError(`Invalid Address: ${address}`);
    }

    return RFUtil.bitStringToBitArray(address);
  }

  static payloadToCommand(payload) {
    console.log('payloadToCommand', payload);
    if (payload.length === 17 || payload.length === 24) {
      const data = {
        address: RFUtil.bitArrayToString(payload),
        state: true,
      };
      data.id = data.address;
      return data;
    }
    return null;
  }

  static createPairCommand() {
    const data = {
      address: RFUtil.generateRandomBitString(17),
      state: false,
    };
    data.id = data.address;
    return data;
  }

};
