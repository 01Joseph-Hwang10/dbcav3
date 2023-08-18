import React from 'react';
import {TouchableOpacity} from 'react-native';
import MenuBarIcon from './menu-bar-icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {cIcon, iconSize, paletteFocused, RPIcons} from './icons.utils';

interface POptions extends RPIcons {}

const OptionsIcon: React.FC<POptions> = ({paletteMode, setPaletteMode}) => {
  const onPress = () => setPaletteMode('options');
  return (
    <TouchableOpacity onPress={onPress}>
      <MenuBarIcon>
        <Ionicons
          name="options-outline"
          size={iconSize}
          color={paletteFocused(paletteMode, 'options')}
        />
      </MenuBarIcon>
    </TouchableOpacity>
  );
};

export default cIcon(OptionsIcon);
