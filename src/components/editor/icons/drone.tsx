import {useNavigation} from '@react-navigation/core';
import {NavigationProp} from '@src/navigation/navigator.types';
import {ColorPalette} from '@src/themes/colors';
import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {iconSize} from './icons.utils';
import MenuBarIcon from './menu-bar-icon';

const DroneIcon: React.FC = () => {
  const navigation = useNavigation<NavigationProp<'editor'>>();
  const onPress = () => navigation.navigate('configDrone');
  return (
    <TouchableOpacity onPress={onPress}>
      <MenuBarIcon style={styles.icon}>
        <AntDesign name="API" size={iconSize} color={ColorPalette.black} />
      </MenuBarIcon>
    </TouchableOpacity>
  );
};

export default DroneIcon;

const styles = StyleSheet.create({
  icon: {
    paddingBottom: 0,
  },
});
