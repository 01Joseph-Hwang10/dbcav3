import React from 'react';
import {OptionType} from './option-list.utils';
import {ColorPalette} from '@src/themes/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface POptionIcon {
  type: OptionType;
  size: number;
}

const OptionIcon: React.FC<POptionIcon> = ({type, size}) => {
  switch (type) {
    case 'function':
      return (
        <MaterialCommunityIcons
          name="function-variant"
          size={size}
          color={ColorPalette.gold}
        />
      );
    case 'block':
      return (
        <MaterialCommunityIcons
          name="puzzle"
          size={size}
          color={ColorPalette.dark}
        />
      );
    case 'calculation':
    case 'comparer':
      return (
        <AntDesign name="calculator" size={size} color={ColorPalette.skyblue} />
      );
    case 'variable':
      return (
        <MaterialCommunityIcons
          name="variable"
          size={size}
          color={ColorPalette.dark}
        />
      );
    case 'input':
      return (
        <MaterialIcons name="input" size={size} color={ColorPalette.dark} />
      );
    case 'keyword':
      return <Entypo name="shuffle" size={size} color={ColorPalette.violet} />;
    default:
      return (
        <Ionicons
          name="options-outline"
          size={size}
          color={ColorPalette.black}
        />
      );
  }
};

export default OptionIcon;
