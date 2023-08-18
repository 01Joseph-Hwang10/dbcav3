import RoundedButton from '@src/components/common/button/rounded-button';
import Center from '@src/components/common/styled/center';
import {ColorPalette} from '@src/themes/colors';
import {st} from '@src/themes/styles';
import React from 'react';
import styled, {css} from 'styled-components/native';

const block = css`
  flex: 1;
  width: 100%;
  min-height: 20px;
  min-width: 50px;
`;

const Block = styled(Center)`
  ${block}
`;

const Button = styled(RoundedButton)`
  ${block}
`;

const RootView = styled(Center)`
  width: 100%;
  flex-direction: row;
  height: 30px;
  margin: 5px 0px;
`;

interface PCompareRow {
  leftValue: string;
  centerValue: string;
  rightValue: string;
  leftFocusable?: boolean;
  centerFocusable?: boolean;
  rightFocusable?: boolean;
  onRowPress?: () => void;
  onLeftPress?: () => void;
  onCenterPress?: () => void;
  onRightPress?: () => void;
}

const CompareRow: React.FC<PCompareRow> = ({
  leftValue,
  centerValue,
  rightValue,
  leftFocusable = true,
  centerFocusable = true,
  rightFocusable = true,
  onCenterPress,
  onLeftPress,
  onRightPress,
  onRowPress,
}) => {
  const leftPress = () => {
    onRowPress && onRowPress();
    onLeftPress && onLeftPress();
  };
  const centerPress = () => {
    onRowPress && onRowPress();
    onCenterPress && onCenterPress();
  };
  const rightPress = () => {
    onRowPress && onRowPress();
    onRightPress && onRightPress();
  };
  return (
    <RootView>
      <Block>
        <Button
          onPress={leftPress}
          style={st.bgColor(ColorPalette.deepBlue)}
          contentContainerStyle={st.center}
          text={leftValue}
          focusable={leftFocusable}
          backgroundColor={ColorPalette.deepBlue}
        />
      </Block>
      <Block>
        <Button
          onPress={centerPress}
          style={st.bgColor(ColorPalette.gray)}
          contentContainerStyle={st.center}
          text={centerValue}
          focusable={centerFocusable}
          backgroundColor={ColorPalette.gray}
        />
      </Block>
      <Block>
        <Button
          onPress={rightPress}
          style={st.bgColor(ColorPalette.deepBlue)}
          contentContainerStyle={st.center}
          text={rightValue}
          focusable={rightFocusable}
          backgroundColor={ColorPalette.deepBlue}
        />
      </Block>
    </RootView>
  );
};

export default CompareRow;
