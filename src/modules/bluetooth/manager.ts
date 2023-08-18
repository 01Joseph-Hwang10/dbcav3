import {Alert, AlertButton, Platform} from 'react-native';
import {BleManager, State} from 'react-native-ble-plx';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';
import {Location} from '../location';

declare module 'react-native-ble-plx' {
  // eslint-disable-next-line no-shadow
  interface BleManager {
    /**
     * @description Enables BLE if it is not enabled.
     */
    enableBLE(): Promise<void>;
    /**
     * @description Checks if Bluetooth and Location is enabled
     */
    enabled(): Promise<boolean>;
    /**
     * @description Checks if Bluetooth is enabled
     */
    bluetoothEnabled(): Promise<boolean>;
    /**
     * @description Requests permission
     */
    requestPermission(): Promise<boolean>;
  }
}

const notifyBluetoothRequest = async () => {
  return new Promise(resolve => {
    const buttons: AlertButton[] = [
      {
        text: 'OK',
        onPress: resolve,
        style: 'default',
      },
      {
        text: 'Cancel',
        onPress: resolve,
        style: 'cancel',
      },
    ];
    Alert.alert(
      '위치 권한 허용',
      '드론에서 블록코드를 실행하기 위해 위치 권한이 필요합니다',
      buttons,
    );
  });
};

BleManager.prototype.enableBLE = async function () {
  if (await this.enabled()) return;
  await Location.enable();
  await this.requestPermission();
  if (await this.bluetoothEnabled()) return;
  if (Platform.OS === 'android') {
    await this.enable();
  }
};

BleManager.prototype.enabled = async function () {
  const bleEnabled =
    (await this.bluetoothEnabled()) && (await Location.enabled());
  if (bleEnabled) return true;
  return false;
};

BleManager.prototype.bluetoothEnabled = async function () {
  const state = await this.state();
  if (state === State.PoweredOn) return true;
  return false;
};

BleManager.prototype.requestPermission = async function () {
  if (Platform.OS === 'android') {
    let granted: PermissionStatus;
    granted = await check(PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE);
    if (granted !== 'granted')
      granted = await request(PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE);
    if (granted !== 'granted') {
      await notifyBluetoothRequest();
      return false;
    }
    granted = await check(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
    if (granted !== 'granted')
      granted = await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
    if (granted !== 'granted') {
      await notifyBluetoothRequest();
      return false;
    }
    granted = await check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
    if (granted !== 'granted')
      granted = await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
    if (granted !== 'granted') {
      await notifyBluetoothRequest();
      return false;
    }
    return true;
  } else {
    return false;
  }
};
