import {useTimeout} from '@src/hooks/timer/useTimeout';
import {
  SensorData,
  sensorDataList,
} from '@src/modules/block-definitions/helpers';
import {ColorPalette} from '@src/themes/colors';
import {st} from '@src/themes/styles';
import React, {useState} from 'react';
import {Platform, useWindowDimensions, ViewStyle} from 'react-native';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import ShadowOpacityView from '../../common/animation/shadow-opacity-view';
import ListView, {ListViewItem} from '../../common/lists/list-view';
import {hexagonPartAnimationDuration} from '../constants';
import SensorListButton from './sensor-list-button';

const renderItem: ListViewItem<SensorData> = ({item: sensorData, index}) => {
  const [sensor, title] = sensorData;
  return <SensorListButton key={index} sensor={sensor} title={title} />;
};

const ItemSeperatorComponent = styled.View`
  width: 100%;
  height: 2.5px;
  background-color: ${ColorPalette.dark};
`;

const keyExtractor = (_: SensorData, index: number) => index.toString();

const SensorList: React.FC = () => {
  const inset = useSafeAreaInsets();
  const [delayedPortNumber, setDelayedPortNumber] = useState<number>(-1);
  const {height} = useWindowDimensions();
  const focusedPortNumber = useSelector(
    (state: RootState) => state.configDrone.focusedPortIdx + 1,
  );
  const sensorOpened = useSelector(
    (state: RootState) => state.configDrone.sensorOpened,
  );

  const {rootStyle} = getStyles({
    delayedPortNumber,
    height,
    inset,
  });

  useTimeout(
    () => {
      setDelayedPortNumber(focusedPortNumber);
    },
    hexagonPartAnimationDuration,
    [focusedPortNumber],
  );

  return (
    <ShadowOpacityView
      style={rootStyle}
      activate={sensorOpened && focusedPortNumber !== -1}
      shadowLevel={Platform.OS === 'android' ? 45 : 25}>
      <ListView
        data={sensorDataList}
        renderItem={renderItem}
        contentContainerStyle={[st.justify('flex-start'), st.align('center')]}
        ItemSeparatorComponent={ItemSeperatorComponent}
        keyExtractor={keyExtractor}
        style={[st.rounded(5), st.bgColor(ColorPalette.whitesmoke)]}
        scrollable={true}
      />
    </ShadowOpacityView>
  );
};

export default SensorList;

interface IGetStyles {
  delayedPortNumber: number;
  inset: EdgeInsets;
  height: number;
}

const getStyles = ({delayedPortNumber, inset, height}: IGetStyles) => {
  const rootStyle: ViewStyle = {
    position: 'absolute',
    top: Platform.OS === 'ios' ? inset.top + 50 : inset.top - inset.bottom + 10,
    height: ((height - inset.top - inset.bottom) * 2) / 3,
    minWidth: 150,
    opacity: 0,
    zIndex: 9999,
  };
  const horizontalInsetDiff = Math.abs(inset.right - inset.left);
  const getPosInset = (root: number) =>
    Platform.OS === 'ios' ? root + 75 : root + 50;
  if ([2, 3, 4].includes(delayedPortNumber)) {
    rootStyle.right = getPosInset(horizontalInsetDiff);
  } else {
    rootStyle.left = getPosInset(-horizontalInsetDiff);
  }
  return {
    rootStyle,
  };
};
