import {VarBlock} from '@src/modules/block-definitions/variables/variable';
import {ColorPalette} from '@src/themes/colors';
import {withOpacity} from '@src/tools/string-tools';
import {ISectionEdge, SectionData} from '@src/utils/types';
import React from 'react';
import {SectionList, SectionListRenderItem} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import VariableItem from './variable-item';
import AddIcon from '../icons/add-button';
import {getLocalVariables} from '@src/redux/queries/workspace';
import {createGlobalVar} from '@src/redux/slices/workspace';
import PaletteWrapper from './parials/palette-wrapper';
import {useUpdater} from '@src/hooks/useUpdater';
import {useFocusedFunc} from '@src/hooks/redux-queries';
import styled from 'styled-components/native';
import {Bold} from '@src/components/common/styled/text';
import Center from '@src/components/common/styled/center';

interface PPadding {
  value?: [number, number];
}

const Padding = styled(Center)<PPadding>`
  flex-direction: row;
  width: 100%;
  padding: ${({value}) => `${value?.[0] ?? 0}px ${value?.[1] ?? 0}px`};
`;

const Header = styled(Padding)`
  border-bottom-width: 1px;
  border-color: ${withOpacity(ColorPalette.gray, 0.7)};
  justify-content: flex-start;
`;

const renderItem: SectionListRenderItem<VarBlock> = ({item: variable}) => {
  return <VariableItem variable={variable} />;
};

const renderSectionHeader = ({section: {title}}: ISectionEdge<VarBlock>) => {
  return (
    <Padding value={[5, 10]}>
      <Header value={[5, 0]}>
        <Bold size={20}>{title}</Bold>
      </Header>
    </Padding>
  );
};

interface PAdd {
  title: string;
}

const AddComponent: React.FC<PAdd> = ({title}) => {
  useUpdater();
  const dispatch = useDispatch();
  const focusedFunc = useFocusedFunc();
  const onPress = () => {
    if (title === '전역 변수') {
      dispatch(createGlobalVar());
    }
    if (title === '로컬 변수' && focusedFunc) {
      focusedFunc.createLocalVar();
    }
  };
  return <AddIcon onPress={onPress} size={26} />;
};

const renderSectionFooter = ({section: {title}}: ISectionEdge<VarBlock>) => (
  <AddComponent title={title} />
);

const keyExtractor = ({id, varType}: VarBlock) => `var:${varType}:${id}`;

interface PVariableList {}

const VariableList: React.FC<PVariableList> = () => {
  useUpdater();
  const globalVars = useSelector(
    (state: RootState) => state.workspace.globalVars,
  );
  const localVars = useSelector((state: RootState) => getLocalVariables(state));
  const sections: SectionData<VarBlock>[] = [
    {
      title: '전역 변수',
      data: globalVars,
    },
    {
      title: '로컬 변수',
      data: localVars,
    },
  ];
  return (
    <PaletteWrapper>
      <SectionList
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionFooter}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </PaletteWrapper>
  );
};

export default VariableList;
