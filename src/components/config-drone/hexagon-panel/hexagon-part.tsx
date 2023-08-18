import React from 'react';
import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {batch, useDispatch, useSelector} from 'react-redux';
import {ColorPalette} from '@src/themes/colors';
import {
  decidePortNumber,
  modulePosX,
  modulePosY,
  textPosX,
  textPosY,
  Rotate,
} from './helpers';
import Triangle from '../shapes/triangle';
import {textWrapperSize} from '../constants';
import PopUpButton from './pop-up-button';
import HexagonModule from './hexagon-module';
import {PosSpec} from '@src/utils/types';
import AnimatedHexagonPart from '../../common/animation/animated-hexagon-part';
import TapPositionHandler from '../../common/gesture-handler/tap-position-handler';
import {
  setFocusedPortIdx,
  setSensorOpened,
} from '@src/redux/slices/config-drone';
import styled from 'styled-components/native';
import Center from '../../common/styled/center';
import {InsetsData} from '@src/themes/utils';
import {Bold} from '../../common/styled/text';

interface PortNumberMixin {
  portNumber: number;
}

const TriangleWrapper = styled.View<PortNumberMixin>`
  transform: rotateZ(${({portNumber}) => Rotate.cis(portNumber)});
`;

const TextWrapper = styled(Center)<PortNumberMixin>`
  width: ${textWrapperSize}px;
  height: ${textWrapperSize}px;
  border-radius: ${textWrapperSize / 2}px;
  position: absolute;
  background-color: ${ColorPalette.dark};
  transform: translateX(${({portNumber}) => textPosX(portNumber)}px)
    translateY(${({portNumber}) => textPosY(portNumber)}px);
`;

const StyledText = styled(Bold)<PortNumberMixin>`
  color: ${ColorPalette.whitesmoke};
  font-size: ${textWrapperSize * (5 / 6)}px;
  transform: rotateZ(${({portNumber}) => Rotate.trans(portNumber)})
    translateY(${Platform.OS === 'android' ? -3 : 0}px); // temporal adjustment
`;

const HexagonWrapper = styled.View<
  PortNumberMixin & Pick<InsetsData, 'insets'>
>`
  transform: translateX(
      ${({portNumber, insets}) => modulePosX(portNumber, insets)}px
    )
    translateY(${({portNumber, insets}) => modulePosY(portNumber, insets)}px);
  position: absolute;
`;

const HexagonPart: React.FC<PortNumberMixin> = ({portNumber}) => {
  const insets = useSafeAreaInsets();
  const focusedPortNumber = useSelector(
    (state: RootState) => state.configDrone.focusedPortIdx + 1,
  );
  const sensorOpened = useSelector(
    (state: RootState) => state.configDrone.sensorOpened,
  );
  const origin = useSelector((state: RootState) => state.configDrone.origin);
  const dispatch = useDispatch();
  const onFocus = focusedPortNumber === portNumber;

  const onTap = (tappedPosition: PosSpec) => {
    batch(() => {
      const platformSpecific = Platform.select({
        ios: () => {
          if (!onFocus) return;
          if (sensorOpened) return;
          dispatch(setFocusedPortIdx(-1));
        },
        android: () => {
          dispatch(setSensorOpened(false));
          if (!onFocus) return;
          dispatch(setFocusedPortIdx(-1));
        },
      });
      platformSpecific && platformSpecific();
      if (onFocus) return;
      const portIdx = decidePortNumber(portNumber, tappedPosition, origin) - 1;
      dispatch(setFocusedPortIdx(portIdx));
    });
  };

  return (
    <AnimatedHexagonPart activate={onFocus} {...{portNumber}}>
      <TapPositionHandler onTap={onTap}>
        <TriangleWrapper {...{portNumber}}>
          <Triangle onFocus={onFocus}>
            <TextWrapper {...{portNumber}}>
              <StyledText {...{portNumber}}>{portNumber.toString()}</StyledText>
            </TextWrapper>
          </Triangle>
          <PopUpButton onFocus={onFocus} {...{portNumber}} />
        </TriangleWrapper>
      </TapPositionHandler>
      <HexagonWrapper {...{portNumber}} insets={insets}>
        <HexagonModule onFocus={onFocus} {...{portNumber}} />
      </HexagonWrapper>
    </AnimatedHexagonPart>
  );
};

export default HexagonPart;
