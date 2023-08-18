import {Nullable} from '@src/utils/types';
import {FunctionBlock} from './functions/function';

type TMotor = 'motor';

export type TSensor =
  | 'barometer'
  | 'ultrasonicSensor'
  | 'infraredSensor'
  | 'lightSensor'
  | 'soundSensor'
  | 'colorSensor'
  | 'camera'
  | 'speaker'
  | 'temperatureSensor'
  | 'touchSensor'
  | 'sensor'; // Idk what the sensor name is

export const Sensor: Record<TSensor, TSensor> = {
  barometer: 'barometer',
  ultrasonicSensor: 'ultrasonicSensor',
  infraredSensor: 'infraredSensor',
  lightSensor: 'lightSensor',
  soundSensor: 'soundSensor',
  colorSensor: 'colorSensor',
  camera: 'camera',
  speaker: 'speaker',
  temperatureSensor: 'temperatureSensor',
  touchSensor: 'touchSensor',
  sensor: 'sensor',
};

export type SensorData = [TSensor, string];

export const sensorDataList: SensorData[] = [
  ['barometer', '기압계'],
  ['camera', '카메라'],
  ['colorSensor', '색깔 센서'],
  ['infraredSensor', '적외선 센서'],
  ['lightSensor', '빛 센서'],
  ['soundSensor', '소리 센서'],
  ['speaker', '스피커'],
  ['temperatureSensor', '온도 센서'],
  ['touchSensor', '터치 센서'],
  ['ultrasonicSensor', '초음파 센서'],
];

export type DroneModule = TMotor | TSensor;

export const getModuleName = (funcName: string): Nullable<string> => {
  if (funcName === '메인') {
    return 'main';
  }
  const moduleName = sensorDataList.find(data => data[1] === funcName)?.[0];
  return moduleName;
};

export const getSensorName = (sensor: TSensor): Nullable<string> =>
  sensorDataList.find(data => data[0] === sensor)?.[1];

export const getSensorByName = (sensorName: string): Nullable<string> =>
  sensorDataList.find(data => data[1] === sensorName)?.[0];

export const processFuncRef = (ref: string | FunctionBlock): string => {
  if (typeof ref === 'string') {
    return ref;
  } else {
    return ref.id;
  }
};
