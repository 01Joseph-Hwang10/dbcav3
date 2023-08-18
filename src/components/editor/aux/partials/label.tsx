import {Bold} from '@src/components/common/styled/text';
import {StyleMixin} from '@src/utils/types';
import React from 'react';
import {ViewStyle} from 'react-native';
import styled from 'styled-components/native';

interface PLabel extends StyleMixin {
  value: string;
  align?: ViewStyle['justifyContent'];
}

const LabelBox = styled.View<Pick<PLabel, 'align'>>`
  width: 100%;
  flex-direction: row;
  justify-content: ${({align}) => align ?? 'center'};
  align-items: center;
`;

const Label: React.FC<PLabel> = ({value, align, style}) => {
  return (
    <LabelBox style={style} align={align}>
      <Bold>{value}</Bold>
    </LabelBox>
  );
};

export default Label;
