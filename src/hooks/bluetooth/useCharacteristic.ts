import {Nullable} from '@src/utils/types';
import {useEffect, useState} from 'react';
import {Characteristic} from 'react-native-ble-plx';
import {useSelector} from 'react-redux';

export const useCharacteristic = (
  characteristicUUID: string,
): Nullable<Characteristic> => {
  const [characteristic, setCharacteristic] =
    useState<Nullable<Characteristic>>();
  const connectedDevice = useSelector(
    (state: RootState) => state.configDrone.connectedDevice,
  );
  useEffect(() => {
    void (async function () {
      setCharacteristic(await connectedDevice?.use(characteristicUUID));
    })();
  }, [characteristicUUID, connectedDevice]);
  return characteristic;
};
