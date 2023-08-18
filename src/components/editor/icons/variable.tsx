import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {cIcon, iconSize, paletteFocused, RPIcons} from './icons.utils';
import MenuBarIcon from './menu-bar-icon';

interface PVariableIcon extends RPIcons {}

const VariableIcon: React.FC<PVariableIcon> = ({
  paletteMode,
  setPaletteMode,
}) => {
  const onPress = () => setPaletteMode('variables');
  return (
    <TouchableOpacity onPress={onPress}>
      <MenuBarIcon>
        <MaterialCommunityIcons
          name="variable"
          size={iconSize}
          color={paletteFocused(paletteMode, 'variables')}
        />
      </MenuBarIcon>
    </TouchableOpacity>
  );
};

export default cIcon(VariableIcon);
