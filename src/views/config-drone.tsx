import InsetsView from '@src/components/common/styled/insets-view';
import BottomButtons from '@src/components/config-drone/bottom-buttons';
import HexagonPanel from '@src/components/config-drone/hexagon-panel';
import SensorList from '@src/components/config-drone/sensor-list';
import {NavigationMixin} from '@src/navigation/navigator.types';
import {ColorPalette} from '@src/themes/colors';
import React from 'react';
import styled from 'styled-components/native';
import {center} from '@src/components/common/styled/center';
import BLEConfig from '@src/components/config-drone/ble-config';

const RootView = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${ColorPalette.dark};
  flex-direction: row;
`;

const ButtonSection = styled(InsetsView)`
  padding: 10px 20px;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const HexagonSection = styled(InsetsView)`
  ${center}
`;

interface PConfigDrone extends NavigationMixin<'configDrone'> {}

const ConfigDrone: React.FC<PConfigDrone> = () => {
  // useAutoSave();
  return (
    <RootView>
      <ButtonSection direction="vertical">
        <BottomButtons />
      </ButtonSection>
      <BLEConfig />
      <SensorList />
      <HexagonSection direction="vertical">
        <HexagonPanel />
      </HexagonSection>
    </RootView>
  );
};

export default ConfigDrone;
