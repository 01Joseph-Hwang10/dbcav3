import {CustomSnackBars} from '@src/components/common/utilities/snackbars';
import {Nullable} from '@src/utils/types';
import {Device, Characteristic} from 'react-native-ble-plx';

declare module 'react-native-ble-plx' {
  // eslint-disable-next-line no-shadow
  interface Device {
    exploit(): Promise<Nullable<Device>>;
    allCharacteristics(): Promise<Characteristic[]>;
    use(characteristicUUID: string): Promise<Nullable<Characteristic>>;
  }
}

Device.prototype.exploit = async function () {
  try {
    await this.connect();
    await this.discoverAllServicesAndCharacteristics();
    return this;
  } catch (error) {
    CustomSnackBars.somethingWentWrong();
    return null;
  }
};

Device.prototype.allCharacteristics = async function () {
  const services = await this.services();
  const characteristics: Characteristic[] = [];
  for (const service of services) {
    characteristics.push(...(await service.characteristics()));
  }
  return characteristics;
};

Device.prototype.use = async function (characteristicUUID: string) {
  const characteristics = await this.allCharacteristics();
  // console.log(characteristics);
  return characteristics.find(
    characteristic => characteristic.uuid === characteristicUUID,
  );
};
