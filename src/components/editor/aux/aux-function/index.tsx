import {CallFunctionBlock} from '@src/modules/block-definitions/functions/blocks/call-function';
import {Event, EventRegistry} from '@src/modules/event/event';
import React from 'react';
import FunctionInputList from './function-input-list';
import SelectFunction from './select-function';
import AuxSection from '../partials/aux-section';
import AuxWrapper from '../partials/aux-wrapper';
import Label from '../partials/label';
import {useFocusedBlock} from '@src/hooks/redux-queries';
import {useUpdater} from '@src/hooks/useUpdater';

const AuxFunction: React.FC = () => {
  useUpdater();
  const focusedBlock = useFocusedBlock<CallFunctionBlock>();
  const onDelete = () => {
    const ref = focusedBlock?.funcRef?.ref;
    if (ref) {
      EventRegistry.remove(Event.onChangeInputVars(ref));
    }
  };
  return (
    <AuxWrapper onDelete={onDelete}>
      <AuxSection>
        <Label value="실행할 함수" />
        <SelectFunction functionBlock={focusedBlock} />
      </AuxSection>
      <AuxSection last={true}>
        <Label value="인풋" />
        <FunctionInputList functionBlock={focusedBlock} />
      </AuxSection>
    </AuxWrapper>
  );
};

export default AuxFunction;
