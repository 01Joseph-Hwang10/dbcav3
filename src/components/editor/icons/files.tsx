import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {cIcon, iconSize, paletteFocused, RPIcons} from './icons.utils';
import MenuBarIcon from './menu-bar-icon';

interface PFileIcon extends RPIcons {}

const FileIcon: React.FC<PFileIcon> = ({paletteMode, setPaletteMode}) => {
  const onPress = () => setPaletteMode('files');
  return (
    <TouchableOpacity onPress={onPress}>
      <MenuBarIcon style={styles.icon}>
        <FontAwesome
          name="folder"
          size={iconSize}
          color={paletteFocused(paletteMode, 'files')}
        />
      </MenuBarIcon>
    </TouchableOpacity>
  );
};

export default cIcon(FileIcon);

const styles = StyleSheet.create({
  icon: {
    paddingTop: 0,
  },
});
