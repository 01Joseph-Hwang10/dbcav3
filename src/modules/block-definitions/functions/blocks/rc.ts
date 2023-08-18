import {VarRef} from '../../variables/var-ref';
import {MotorDatum} from './motor';

type BlockVariable = number | VarRef;

type RCKeys = 'yaw' | 'pitch' | 'roll' | 'throttle';

export type RCInfo = Record<RCKeys, BlockVariable>;

/**
 * @todo Add Calculation Logic
 *
 * @param {MotorDatum[]} motors
 * @returns {RCInfo}
 */
export const calculateRCInfo = (motors: MotorDatum[]): RCInfo => {
  const rcData: RCInfo = {
    yaw: 1500,
    pitch: 1500,
    roll: 1500,
    throttle: 2000,
  };
  if (motors.length === 4) {
    Object.entries(rcData).map(([key], index) => {
      // @ts-ignore
      rcData[key] = motors[index].thrust;
    });
  }
  return rcData;
};
