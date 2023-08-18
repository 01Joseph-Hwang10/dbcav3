import {
  Assignment,
  Calculatee,
  Calculation,
} from '@src/modules/block-definitions/functions/blocks/assign';
import {VarRef} from '@src/modules/block-definitions/variables/var-ref';
import {ColorPalette} from '@src/themes/colors';
import React from 'react';
import CompareRow from '../partials/compare-row';
import {Event, EventRegistry} from '@src/modules/event/event';
import {IOptionItem} from '../../palette/option-list/option-list.utils';
import {displayVarNameHandler} from '@src/tools/handlers';
import VarButton from './var-button';
import {getCalculation} from './helpers';
import {useDispatch} from 'react-redux';
import {setOptionMode, setPaletteMode} from '@src/redux/slices/editor';
import styled from 'styled-components/native';
import Center from '@src/components/common/styled/center';
import {useUpdater} from '@src/hooks/useUpdater';

const Container = styled(Center)`
  border-width: 2.5px;
  border-color: ${ColorPalette.skyblue};
  border-radius: 10px;
  margin-bottom: 7px;
`;

const Wrapper = styled.View`
  padding: 5px 0px;
  border-top-width: 1px;
  border-top-color: ${ColorPalette.gray};
`;

interface PAssignmentRow {
  assignment: Assignment;
  rowIdx: number;
}

const AssignmentRow: React.FC<PAssignmentRow> = ({assignment}) => {
  useUpdater();
  const dispatch = useDispatch();
  const {left, right, calculation, variable} = assignment;

  const onRowPress = () => {
    dispatch(setPaletteMode('options'));
  };
  const onVariablePress = () => {
    onRowPress();
    dispatch(setOptionMode(['variable']));
    EventRegistry.on<IOptionItem<VarRef>>(Event.onChangeOption(), ({data}) => {
      assignment.setVariable(data);
    });
  };
  const onLeftPress = () => {
    dispatch(setOptionMode(['variable', 'raw']));
    EventRegistry.on<IOptionItem<Calculatee>>(
      Event.onChangeOption(),
      ({data}) => {
        assignment.setLeft(data);
      },
    );
  };
  const onCalculationPress = () => {
    dispatch(setOptionMode(['calculation']));
    EventRegistry.on<IOptionItem<Calculation>>(
      Event.onChangeOption(),
      ({data}) => {
        assignment.setCalculation(data);
      },
    );
  };
  const onRightPress = () => {
    dispatch(setOptionMode(['variable', 'raw']));
    EventRegistry.on<IOptionItem<Calculatee>>(
      Event.onChangeOption(),
      ({data}) => {
        assignment.setRight(data);
      },
    );
  };
  return (
    <Container>
      <VarButton
        onPress={onVariablePress}
        text={displayVarNameHandler(variable, true)}
      />
      <Wrapper>
        <CompareRow
          onRowPress={onRowPress}
          onLeftPress={onLeftPress}
          onCenterPress={onCalculationPress}
          onRightPress={onRightPress}
          leftValue={displayVarNameHandler(left)}
          rightValue={displayVarNameHandler(right)}
          centerValue={getCalculation(calculation)}
        />
      </Wrapper>
    </Container>
  );
};

export default AssignmentRow;
