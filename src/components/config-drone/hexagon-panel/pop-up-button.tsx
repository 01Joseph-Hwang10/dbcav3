import {Bold} from '@src/components/common/styled/text';
import {CustomSnackBars} from '@src/components/common/utilities/snackbars';
import {
  setFocusedPortIdx,
  setModule,
  setSensorOpened,
} from '@src/redux/slices/config-drone';
import {ColorPalette} from '@src/themes/colors';
import {APP_MODE} from '@src/utils/config';
import React from 'react';
import {Platform} from 'react-native';
import {batch, useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import ShadowOpacityView from '../../common/animation/shadow-opacity-view';
import {popUpPosX, popUpPosY, Rotate} from './helpers';

interface PAnimatedContainer {
  portNumber: number;
}

const AnimatedContainer = styled(ShadowOpacityView)<PAnimatedContainer>`
  position: absolute;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  background-color: ${ColorPalette.whitesmoke};
  border-top-width: 3px;
  border-top-color: ${ColorPalette.dark};
  opacity: 0;
  transform: translateX(${({portNumber}) => popUpPosX(portNumber)}px)
    translateY(${({portNumber}) => popUpPosY(portNumber)}px)
    rotateZ(${({portNumber}) => Rotate.trans(portNumber)});
`;

const Divider = styled.View`
  width: 100%;
  height: 3px;
  background-color: ${ColorPalette.dark};
`;

const Button = styled.TouchableOpacity`
  padding: 3px 10px;
`;

const Wrapper = styled.View`
  position: absolute;
`;

interface PopUpButtonProps {
  onFocus: boolean;
  portNumber: number;
}

const PopUpButton: React.FC<PopUpButtonProps> = ({onFocus, portNumber}) => {
  const dispatch = useDispatch();

  const selectMotor = () => {
    if (APP_MODE === 'mod1') {
      CustomSnackBars.comingSoon();
      return;
    }
    batch(() => {
      dispatch(setModule({index: portNumber - 1, module: 'motor'}));
      dispatch(setFocusedPortIdx(-1));
      dispatch(setSensorOpened(false));
    });
  };

  const selectNone = () => {
    if (APP_MODE === 'mod1') {
      CustomSnackBars.comingSoon();
      return;
    }
    batch(() => {
      dispatch(setModule({index: portNumber - 1, module: null}));
      dispatch(setFocusedPortIdx(-1));
      dispatch(setSensorOpened(false));
    });
  };

  const selectSensor = () => {
    // CustomSnackBars.comingSoon();
    dispatch(setSensorOpened(true));
  };

  return (
    <Wrapper>
      <AnimatedContainer
        portNumber={portNumber}
        shadowLevel={Platform.OS === 'android' ? 45 : 10}
        activate={onFocus}>
        <Button onPressOut={selectMotor}>
          <Bold size={20}>모터</Bold>
        </Button>
        <Divider />
        <Button onPressOut={selectSensor}>
          <Bold size={20}>센서</Bold>
        </Button>
        <Divider />
        <Button onPressOut={selectNone}>
          <Bold size={20}>없음</Bold>
        </Button>
      </AnimatedContainer>
    </Wrapper>
  );
};

export default PopUpButton;
