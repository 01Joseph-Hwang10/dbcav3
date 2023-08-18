import {SERVICE_UUID} from '@src/modules/arduino/values';
import {bleManager} from '@src/modules/bluetooth/bluetooth';
import {wait} from '@src/tools/async';
import {Logger} from '@src/tools/debug';
import {useEffect, useState} from 'react';
import {Device} from 'react-native-ble-plx';
import Snackbar from 'react-native-snackbar';

interface IUseDevices {
  devices: Device[];
  rescan: () => Promise<void>;
}

export const useDevices = (scan?: boolean): IUseDevices => {
  const [devices, setDevices] = useState<Device[]>([]);
  const scanDevices = async () => {
    Logger.info('Scanning for devices...');
    await bleManager.enableBLE();
    bleManager.startDeviceScan([SERVICE_UUID], {}, (error, newDevice) => {
      if (error) {
        Logger.error(JSON.stringify(error));
        let message: string =
          "There's something wrong with your bluetooth. You might not turned it on";
        if (error.errorCode === 601) message = 'Location Services disabled';
        if (error.errorCode === 600)
          message =
            'Undocumented scan throttle: Please try the scan again after 30 seconds.';
        Snackbar.show({
          text: message,
          duration: Snackbar.LENGTH_SHORT,
        });
        return;
      }
      if (!newDevice) return;
      if (devices.find(device => device.id === newDevice.id)) return;
      setDevices([...devices, newDevice]);
    });
  };
  const stopScan = () => {
    bleManager.stopDeviceScan();
  };
  useEffect(() => {
    if (scan) {
      void (async function () {
        await scanDevices();
      })();
    } else {
      stopScan();
    }
    return stopScan;
  }, [scan]); // eslint-disable-line react-hooks/exhaustive-deps
  const rescan = async () => {
    if (!scan) return;
    stopScan();
    await wait(500);
    await scanDevices();
  };
  return {devices, rescan};
};
