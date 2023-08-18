import React from 'react';
import {CallFunctionBlock} from '@src/modules/block-definitions/functions/blocks/call-function';
import styled from 'styled-components/native';
import {ColorPalette} from '@src/themes/colors';
import {Span} from '@src/components/common/styled/text';
import {Nullable} from '@src/utils/types';
import {KeywordBlock} from '@src/modules/block-definitions/block';
import {useUpdater} from '@src/hooks/useUpdater';
import {APP_MODE} from '@src/utils/config';

interface PLabel {
  black?: boolean;
}

const Label = styled(Span)<PLabel>`
  font-size: 20px;
  color: ${({black}) => (black ? ColorPalette.black : ColorPalette.gray)};
`;

interface PGridInner {
  order: number;
  block: Nullable<KeywordBlock>;
}

const GridInnerBlock: React.FC<PGridInner> = ({order, block}) => {
  useUpdater();
  let isFunction = false;
  let text: Nullable<string> = block?.name.capitalize();
  if (APP_MODE === 'mod1' && block?.name === 'motor') {
    text = 'Control';
  }
  if (!text) {
    text = order.toString();
  }
  if (block?.name === 'function') {
    text = (block as CallFunctionBlock)?.callback.funcName;
    isFunction = true;
  }
  if (block?.name === 'assign') {
    text = '+x';
  }
  return <Label black={isFunction}>{text}</Label>;
};

export default GridInnerBlock;
