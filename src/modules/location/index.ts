import {Nullable} from '@src/utils/types';
import {Alert, AlertButton, NativeModules, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';

interface ILocationAndroid {
  enable(): Promise<void>;
  disable(): Promise<void>;
  enabled(callback: (error: any, isEnabled: Nullable<boolean>) => void): void;
}

const LocationAndroid = NativeModules.AndroidLocationModule as ILocationAndroid;

class NativeLocationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NativeLocationError';
  }
}

const notifyLocationRequest = async () => {
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

export class Location {
  static async enable(): Promise<void> {
    try {
      if (await Location.enabled()) return;
      if (Platform.OS === 'android') {
        if (!(await Location.requestPermission())) return;
        await LocationAndroid.enable();
      }
    } catch (error: any) {
      throw new NativeLocationError(error?.message);
    }
  }

  static async requestPermission(): Promise<boolean> {
    if (Platform.OS === 'android') {
      let granted: PermissionStatus = await check(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (granted !== 'granted') {
        granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      }
      if (granted !== 'granted') {
        await notifyLocationRequest();
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  static async disable(): Promise<void> {
    try {
      if (Platform.OS === 'android') {
        await LocationAndroid.disable();
      }
    } catch (error: any) {
      throw new NativeLocationError(error?.message);
    }
  }

  static async enabled(): Promise<Nullable<boolean>> {
    try {
      if (Platform.OS === 'android') {
        const isEnabled = await new Promise<boolean>((resolve, reject) => {
          LocationAndroid.enabled((error: any, state: Nullable<boolean>) => {
            if (error || typeof state !== 'boolean') {
              reject(error);
            }
            resolve(state as boolean);
          });
        });
        return isEnabled;
      }
      /**
       * @todo Implement iOS logic
       */
      return null;
    } catch (error: any) {
      throw new NativeLocationError(error?.message);
    }
  }
}
