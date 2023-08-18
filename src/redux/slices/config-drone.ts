import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DroneModule} from '@src/modules/block-definitions/helpers';
import {APP_MODE} from '@src/utils/config';
import {Nullable, PosSpec} from '@src/utils/types';
import {Device} from 'react-native-ble-plx';

export interface ConfigDroneState {
  // >>> DATA >>>
  modules: Nullable<DroneModule>[];
  /**
   * @description 연결된 드론 디바이스의 id입니다.
   *              typeof connectedDevice !== 'string' 일 경우는 아무 디바이스도 연결되지 않은 것입니다.
   */
  connectedDevice: Nullable<Device>;
  // <<< DATA <<<

  // >>> DATA STATE >>>
  prevModules: Nullable<DroneModule>[];
  // <<< DATA STATE <<<

  // >>> UI STATE >>>
  focusedPortIdx: number;
  origin: PosSpec;
  sensorOpened: boolean;
  bleOpened: boolean;
  // <<< UI STATE <<<
}

const initialState: ConfigDroneState = {
  modules: new Array(6).fill(null),
  prevModules: new Array(6).fill(null),
  connectedDevice: null,
  focusedPortIdx: -1,
  origin: {x: 1, y: 1},
  sensorOpened: false,
  bleOpened: false,
};

if (APP_MODE === 'mod1') {
  initialState.modules = ['motor', 'motor', null, 'motor', 'motor', null];
  initialState.prevModules = ['motor', 'motor', null, 'motor', 'motor', null];
}

// >>> Payload Types >>>

export type SetModuleIn = {
  module: Nullable<DroneModule>;
  index: number;
};

// <<< Payload Types <<<

export const {
  reducer: configDroneReducer,
  actions: {
    setModules,
    setPrevModules,
    setFocusedPortIdx,
    setModule,
    resetDrone,
    resetConfigDrone,
    setConnectedDevice,
    setBleOpened,
    setOrigin,
    setSensorOpened,
  },
} = createSlice({
  name: 'configDroneSlice',
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<ConfigDroneState['modules']>) => {
      state.modules = action.payload;
    },
    setPrevModules: (
      state,
      action: PayloadAction<ConfigDroneState['prevModules']>,
    ) => {
      state.prevModules = action.payload;
    },
    setModule: (state, action: PayloadAction<SetModuleIn>) => {
      const {module, index} = action.payload;
      state.modules[index] = module;
    },
    setFocusedPortIdx: (
      state,
      action: PayloadAction<ConfigDroneState['focusedPortIdx']>,
    ) => {
      state.focusedPortIdx = action.payload;
    },
    resetDrone: state => {
      state.modules = new Array(6).fill(null);
    },
    resetConfigDrone: state => {
      state = initialState; // eslint-disable-line @typescript-eslint/no-unused-vars
    },
    setConnectedDevice: (
      state,
      action: PayloadAction<ConfigDroneState['connectedDevice']>,
    ) => {
      state.connectedDevice = action.payload;
    },
    setOrigin: (state, action: PayloadAction<ConfigDroneState['origin']>) => {
      state.origin = action.payload;
    },
    setSensorOpened: (
      state,
      action: PayloadAction<ConfigDroneState['sensorOpened']>,
    ) => {
      state.sensorOpened = action.payload;
    },
    setBleOpened: (
      state,
      action: PayloadAction<ConfigDroneState['bleOpened']>,
    ) => {
      state.bleOpened = action.payload;
    },
  },
});
