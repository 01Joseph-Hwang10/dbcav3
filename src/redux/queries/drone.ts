import {DroneModule} from '@src/modules/block-definitions/helpers';

type DroneDatum = [DroneModule, number];

export const getMotorNumbers = (state: RootState): number[] => {
  return state.configDrone.modules
    .map((droneModule, index) => [droneModule, index + 1] as DroneDatum)
    .filter(([droneModule]) => droneModule === 'motor')
    .map(([_, droneNumber]) => droneNumber);
};
