import RoundedButton from '@src/components/common/button/rounded-button';
import Center from '@src/components/common/styled/center';
import {st} from '@src/themes/styles';
import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled(Center)`
  width: 100%;
  padding: 0px 10px;
  margin-top: 5px;
`;

interface PAuxDeleteButton {
  onPress?: () => void;
  lock?: boolean;
}

const AuxDeleteButton: React.FC<PAuxDeleteButton> = ({onPress, lock}) => {
  return (
    <Wrapper>
      <RoundedButton
        onPress={onPress}
        lock={lock}
        text="삭제"
        style={st.bgColor('red')}
      />
    </Wrapper>
  );
};

export default AuxDeleteButton;
