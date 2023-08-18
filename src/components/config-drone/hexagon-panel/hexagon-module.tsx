import {ColorPalette} from '@src/themes/colors';
import React from 'react';
import {triangleSideLength} from '../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModuleIcon from '../../common/module-icon';
import {DroneModule} from '@src/modules/block-definitions/helpers';
import {Nullable} from '@src/utils/types';
import OpacityView from '../../common/animation/opacity-view';
import {st} from '@src/themes/styles';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import Center from '@src/components/common/styled/center';

const HexagonWrapper = styled(Center)`
  position: absolute;
  z-index: 10;
`;

interface PIconWrapper {
  moduleName: Nullable<DroneModule>;
}

const IconWrapper = styled(Center)<PIconWrapper>`
  position: absolute;
  z-index: 11;
  transform: translateX(
    ${({moduleName}) =>
      moduleName === 'motor'
        ? (triangleSideLength * 0.5 * (Math.sqrt(3) / 6)) / 2
        : 0}px
  );
`;

interface HexagonModuleProps {
  onFocus: boolean;
  portNumber: number;
}

const HexagonModule: React.FC<HexagonModuleProps> = ({onFocus, portNumber}) => {
  const drone = useSelector((state: RootState) => state.configDrone.modules);
  const moduleName = drone[portNumber - 1];

  return (
    <OpacityView
      immediate={{atInactivate: true}}
      activate={!onFocus}
      style={st.center}>
      {moduleName !== null && (
        <React.Fragment>
          <HexagonWrapper>
            <MaterialCommunityIcons
              name="hexagon-slice-6"
              size={onFocus ? 0 : triangleSideLength * 1.5}
              color={ColorPalette.whitesmoke}
            />
          </HexagonWrapper>
          <IconWrapper moduleName={moduleName}>
            <ModuleIcon
              module={moduleName}
              size={triangleSideLength * 0.5}
              onHexagonModule={true}
            />
          </IconWrapper>
        </React.Fragment>
      )}
    </OpacityView>
  );
};

export default HexagonModule;
