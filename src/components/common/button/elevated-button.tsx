import {ColorPalette} from '@src/themes/colors';
import {StyleMixin} from '@src/utils/types';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import Center from '../styled/center';
import {getShadowStyle} from '../helpers';
import {PressableMixin} from './button.utils';

const ButtonBase = styled(Center)`
  padding: 5px 20px;
  border-radius: 5px;
  background-color: ${ColorPalette.teal};
  flex-direction: row;
`;

const ElevatedButton: React.FC<
  PressableMixin & StyleMixin & {shadowLevel?: number}
> = ({children, style, shadowLevel, ...rest}) => {
  return (
    <TouchableOpacity {...rest}>
      <ButtonBase style={[getShadowStyle(shadowLevel ?? 4), style]}>
        {children}
      </ButtonBase>
    </TouchableOpacity>
  );
};

export default ElevatedButton;
