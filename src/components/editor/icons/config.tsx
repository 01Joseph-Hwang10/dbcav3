import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {auxFocused, cIcon, iconSize, RPIcons} from './icons.utils';
import MenuBarIcon from './menu-bar-icon';

/**
 * @deprecated
 */
interface PConfigIcon extends RPIcons {}

/**
 * @deprecated
 */
const ConfigIcon: React.FC<PConfigIcon> = ({
  auxMode,
  setAuxMode,
  setFocusedBlockIdx,
}) => {
  const onPress = () => {
    setFocusedBlockIdx(0);
    setAuxMode('config');
  };
  const color = auxFocused(auxMode, ['config']);
  return (
    <TouchableOpacity onPress={onPress}>
      <MenuBarIcon>
        <Ionicons name="ios-settings" size={iconSize} color={color} />
      </MenuBarIcon>
    </TouchableOpacity>
  );
};

export default cIcon(ConfigIcon);
