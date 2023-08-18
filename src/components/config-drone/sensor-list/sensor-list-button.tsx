import {TSensor} from '@src/modules/block-definitions/helpers';
import {
  setFocusedPortIdx,
  setModule,
  setSensorOpened,
} from '@src/redux/slices/config-drone';
import {ColorPalette} from '@src/themes/colors';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {batch, useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import ModuleIcon from '../../common/module-icon';
import {sensorListIconSize} from '../constants';

const TitleBox = styled.View`
  margin-left: 10px;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${ColorPalette.dark};
`;

interface PButton {
  onPress: () => void;
}

const Button = styled(TouchableOpacity)<PButton>`
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 10px;
  flex-direction: row;
`;

interface PSensorListButton {
  title: string;
  sensor: TSensor;
}

const SensorListButton: React.FC<PSensorListButton> = ({title, sensor}) => {
  const dispatch = useDispatch();
  const focusedPortIdx = useSelector(
    (state: RootState) => state.configDrone.focusedPortIdx,
  );
  const onPress = () => {
    batch(() => {
      dispatch(setModule({index: focusedPortIdx, module: sensor}));
      dispatch(setFocusedPortIdx(-1));
      dispatch(setSensorOpened(false));
    });
  };

  return (
    <Button onPress={onPress}>
      <ModuleIcon module={sensor} size={sensorListIconSize} />
      <TitleBox>
        <Title>{title}</Title>
      </TitleBox>
    </Button>
  );
};

export default SensorListButton;
