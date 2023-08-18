import {commonIconSize} from '@src/components/common/helpers';
import {ColorPalette} from '@src/themes/colors';
import React, {useState} from 'react';
import {batch, useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import {injectSensorFuncs} from '@src/redux/slices/workspace';
import {TSensor} from '@src/modules/block-definitions/helpers';
import {useNavigation} from '@react-navigation/core';
import {NavigationProp} from '@src/navigation/navigator.types';
import CircleButton from '@src/components/common/button/circle-button';
import Loader from '@src/components/common/utilities/loader';
import {asAsync} from '@src/tools/async';
import {strictEqual} from '@src/tools/equality';
import {setPrevModules} from '@src/redux/slices/config-drone';
import {Event, EventRegistry} from '@src/modules/event/event';

const HomeButton: React.FC = () => {
  const navigation = useNavigation<NavigationProp<'configDrone'>>();
  const dispatch = useDispatch();
  const modules = useSelector((state: RootState) => state.configDrone.modules);
  const prevModules = useSelector(
    (state: RootState) => state.configDrone.prevModules,
  );
  const [isLoading, setIsLoading] = useState(false);

  const onPress = () => {
    setIsLoading(true);
    asAsync(() => {
      const sensors: TSensor[] = [];
      modules.forEach(droneModule => {
        if (droneModule && droneModule !== 'motor') {
          sensors.push(droneModule as TSensor);
        }
      });
      if (!strictEqual(modules, prevModules)) {
        EventRegistry.emit(Event.onChangeMotor());
        batch(() => {
          dispatch(injectSensorFuncs(sensors));
          dispatch(setPrevModules(modules));
        });
      }
      navigation?.navigate('editor');
      setIsLoading(false);
    });
  };

  return (
    <CircleButton onPress={onPress}>
      <Loader loading={isLoading}>
        <Entypo
          name="home"
          size={commonIconSize * 0.75}
          color={ColorPalette.whitesmoke}
        />
      </Loader>
    </CircleButton>
  );
};

export default HomeButton;
