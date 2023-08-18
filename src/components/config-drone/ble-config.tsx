import React, {useContext, useState} from 'react';
import {Modal, FlatList, ListRenderItem, TouchableOpacity} from 'react-native';
import {Device} from 'react-native-ble-plx';
import {ColorPalette} from '@src/themes/colors';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {setBleOpened, setConnectedDevice} from '@src/redux/slices/config-drone';
import styled from 'styled-components/native';
import Center, {center} from '../common/styled/center';
import ShadowView from '../common/styled/shadow-view';
import {st} from '@src/themes/styles';
import ElevatedButton from '../common/button/elevated-button';
import {Bold, Span} from '../common/styled/text';
import {withOpacity} from '@src/tools/string-tools';
import Loader from '../common/utilities/loader';
import {switchHandler} from '@src/tools/handlers';
import {useDevices} from '@src/hooks/bluetooth/useDevices';
import {
  CallbackContext,
  CallbackCtxProvider,
} from '@src/context/function-context';

const ItemContainer = styled.View<{noOutline?: boolean}>`
  width: 100%;
  border-width: ${({noOutline}) => (noOutline ? 0 : 1)}px;
  border-color: ${ColorPalette.gray};
  border-radius: 10px;
  padding: ${({noOutline}) => (noOutline ? 0 : 10)}px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;
`;

const TextBox = styled(Center)`
  flex-direction: row;
`;

const ListEmptyComponent: React.FC = () => {
  const rescan = useContext(CallbackContext);
  return (
    <Center fill={true}>
      <ElevatedButton
        style={st.bgColor(ColorPalette.deepBlue)}
        onPress={rescan}>
        <Feather name="bluetooth" size={18} color={ColorPalette.whitesmoke} />
        <Span size={18} color={ColorPalette.white}>
          디바이스 스캔하기
        </Span>
      </ElevatedButton>
    </Center>
  );
};

interface PDeviceItem {
  device: Device;
}

const DeviceItem: React.FC<PDeviceItem> = ({device}) => {
  const {name, id} = device;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const connectedDeviceId = useSelector(
    (state: RootState) => state.configDrone.connectedDevice?.id,
  );
  const connected = connectedDeviceId === id;
  const connectDevice = async () => {
    setLoading(true);
    const exploitedDevice = await device.exploit();
    if (exploitedDevice) {
      dispatch(setConnectedDevice(exploitedDevice));
    }
    setLoading(false);
  };
  return (
    <TouchableOpacity onPress={connectDevice}>
      <ItemContainer>
        <TextBox>
          <Feather name="bluetooth" size={24} color={ColorPalette.whitesmoke} />
          <Bold size={24} color={ColorPalette.white}>
            {name}
          </Bold>
        </TextBox>
        <TextBox>
          <Loader loading={loading}>
            <Span size={18} color={ColorPalette.white}>
              {switchHandler(connected, 'Connected', 'Not Connected')}
            </Span>
          </Loader>
        </TextBox>
      </ItemContainer>
    </TouchableOpacity>
  );
};

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setBleOpened(false));
  };
  return (
    <ItemContainer noOutline={true}>
      <Center>
        <Bold size={28} color={ColorPalette.whitesmoke}>
          블루투스 기기 검색
        </Bold>
      </Center>
      <TouchableOpacity onPress={closeModal}>
        <Center>
          <Feather name="x" size={32} color={ColorPalette.whitesmoke} />
        </Center>
      </TouchableOpacity>
    </ItemContainer>
  );
};

const renderItem: ListRenderItem<Device> = ({item}) => (
  <DeviceItem device={item} />
);

const keyExtractor = (item: Device) => item.id;

const ModalRoot = styled(ShadowView)`
  ${center}
  width: 60%;
  height: 80%;
  background-color: ${withOpacity(ColorPalette.teal, 0.8)};
  border-radius: 10px;
  padding: 10px;
`;

const BLEConfig: React.FC = () => {
  const bleOpened = useSelector(
    (state: RootState) => state.configDrone.bleOpened,
  );
  const {devices, rescan} = useDevices(bleOpened);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setBleOpened(false));
  };
  return (
    <Modal
      visible={bleOpened}
      transparent={true}
      animationType="slide"
      onRequestClose={closeModal}
      onDismiss={closeModal}>
      <CallbackCtxProvider value={rescan}>
        <Center fill={true}>
          <ModalRoot shadowLevel={4}>
            <Header />
            <FlatList
              style={st.w('100%')}
              data={devices}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              ListEmptyComponent={ListEmptyComponent}
            />
          </ModalRoot>
        </Center>
      </CallbackCtxProvider>
    </Modal>
  );
};

export default BLEConfig;
