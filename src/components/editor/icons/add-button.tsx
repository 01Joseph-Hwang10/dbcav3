import Center from '@src/components/common/styled/center';
import {ColorPalette} from '@src/themes/colors';
import {StyleMixin} from '@src/utils/types';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

interface PAddIcon {
  onPress?: () => void;
  size?: number;
  iconColor?: string;
}

const IconWrapper = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding: 4px 0px;
`;

const AddIcon: React.FC<PAddIcon> = ({onPress, size, iconColor}) => {
  return (
    <IconWrapper onPress={onPress}>
      <Ionicons
        name="add-circle"
        size={size ?? 30}
        color={iconColor ?? ColorPalette.black}
      />
    </IconWrapper>
  );
};

export default AddIcon;
