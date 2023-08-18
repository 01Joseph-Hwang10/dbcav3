import {ColorPalette} from '@src/themes/colors';
import {StyleMixin} from '@src/utils/types';
import React from 'react';
import Center from './styled/center';
import {Span} from '@src/components/common/styled/text';

interface PPlaceholder extends StyleMixin {
  text: string;
}

const Placeholder: React.FC<PPlaceholder> = ({
  style,
  contentContainerStyle: textStyle,
  text,
}) => {
  return (
    <Center fill={true} style={style}>
      <Span color={ColorPalette.gray} style={textStyle}>
        {text}
      </Span>
    </Center>
  );
};

export default Placeholder;
