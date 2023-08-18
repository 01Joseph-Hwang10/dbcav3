import RoundedInput from '@src/components/common/inputs/rounded-input';
import {VarBlock} from '@src/modules/block-definitions/variables/variable';
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  padding: 5px 10px;
`;

interface PVarItem {
  inputVar: VarBlock;
}

const AuxVarItem: React.FC<PVarItem> = ({inputVar}) => {
  const updateVarName = (varName: string) => {
    inputVar.setVarName(varName);
  };
  const deleteVar = () => {
    inputVar.deleteSelf();
  };
  const onActionsPress = (text?: string) => {
    text && updateVarName(text);
  };
  return (
    <Container>
      <RoundedInput
        deletable={true}
        onLeadingPress={deleteVar}
        onActionsPress={onActionsPress}
        defaultValue={inputVar.varName}
        onSubmit={updateVarName}
        submit={true}
      />
    </Container>
  );
};

export default AuxVarItem;
