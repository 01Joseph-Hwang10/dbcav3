import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {ColorPalette} from '@src/themes/colors';
import CircleButton from '@src/components/common/button/circle-button';
import {batch, useDispatch, useSelector} from 'react-redux';
import {setBleOpened, setConnectedDevice} from '@src/redux/slices/config-drone';
import {bleManager} from '@src/modules/bluetooth/bluetooth';

const BLEButton: React.FC = () => {
  const dispatch = useDispatch();
  const connectedDevice = useSelector(
    (state: RootState) => state.configDrone.connectedDevice,
  );
  const onPress = async () => {
    if (!(await bleManager.enabled())) {
      await bleManager.enableBLE();
    }
    batch(async () => {
      if (!(await connectedDevice?.isConnected())) {
        dispatch(setConnectedDevice(null));
      }
      dispatch(setBleOpened(true));
    });
  };
  return (
    <CircleButton
      onPress={onPress}
      backgroundColor={ColorPalette.skyblue}
      borderColor={ColorPalette.gray}>
      <Feather name="bluetooth" size={30} color={ColorPalette.whitesmoke} />
    </CircleButton>
  );
};

export default BLEButton;
