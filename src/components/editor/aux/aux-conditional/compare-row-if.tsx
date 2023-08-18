import {compaererData} from '@src/redux/queries/options';
import {Event, EventRegistry} from '@src/modules/event/event';
import {displayVarNameHandler} from '@src/tools/handlers';
import React from 'react';
import {IOptionItem} from '../../palette/option-list/option-list.utils';
import CompareRow from '../partials/compare-row';
import {
  Comparee,
  Comparer,
  Condition,
} from '@src/modules/block-definitions/functions/blocks/condition';
import {useDispatch} from 'react-redux';
import {setOptionMode, setPaletteMode} from '@src/redux/slices/editor';
import {useUpdater} from '@src/hooks/useUpdater';

const centerValueHandler = (value: Comparer) =>
  (compaererData.find(([comparerKey]) => comparerKey === value) ?? ['', ''])[1];

interface PCompareRowIfBase {
  condition: Condition;
  rowIdx: number;
}

const CompareRowIf: React.FC<PCompareRowIfBase> = ({condition}) => {
  useUpdater();
  const dispatch = useDispatch();
  const {left, right, comparer} = condition;
  const onRowPress = () => {
    dispatch(setPaletteMode('options'));
  };
  const onLeftPress = () => {
    dispatch(setOptionMode(['variable', 'raw']));
    EventRegistry.on<IOptionItem<Comparee>>(
      Event.onChangeOption(),
      ({data}) => {
        condition.setLeft(data);
      },
    );
  };
  const onRightPress = () => {
    dispatch(setOptionMode(['variable', 'raw']));
    EventRegistry.on<IOptionItem<Comparee>>(
      Event.onChangeOption(),
      ({data}) => {
        condition.setRight(data);
      },
    );
  };
  const onCenterPress = () => {
    dispatch(setOptionMode(['compare']));
    EventRegistry.on<IOptionItem<Comparer>>(
      Event.onChangeOption(),
      ({data}) => {
        condition.setComparer(data);
      },
    );
  };
  return (
    <CompareRow
      onLeftPress={onLeftPress}
      onRightPress={onRightPress}
      onCenterPress={onCenterPress}
      onRowPress={onRowPress}
      leftValue={displayVarNameHandler(left)}
      rightValue={displayVarNameHandler(right)}
      centerValue={centerValueHandler(comparer)}
    />
  );
};

export default CompareRowIf;
