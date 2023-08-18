import RoundedInput from '@src/components/common/inputs/rounded-input';
import {getFocusedVar} from '@src/redux/queries/workspace';
import {ColorPalette} from '@src/themes/colors';
import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import {batch, useDispatch, useSelector} from 'react-redux';
import AuxSection from './partials/aux-section';
import AuxWrapper, {AuxFooter} from './partials/aux-wrapper';
import Label from './partials/label';
import {setFocusedVarId} from '@src/redux/slices/workspace';
import AuxDeleteButton from './partials/delete-button';
import Placeholder from '@src/components/common/placeholder';
import {displayVarNameHandler} from '@src/tools/handlers';
import {useInputTextStyle} from '@src/hooks/useInputTextStyle';
import {useDestructor} from '@src/hooks/function-components/useDestructor';
import {st} from '@src/themes/styles';
import {useUpdater} from '@src/hooks/useUpdater';

const AuxVariable: React.FC = () => {
  useUpdater();
  const dispatch = useDispatch();
  const focusedVar = useSelector((state: RootState) => getFocusedVar(state));
  const focusedVarId = focusedVar?.id;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // eslint-disable-line no-undef
  const {inputTextStyle, onFocus, onBlur} = useInputTextStyle();
  const cleaner = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  useDestructor(cleaner);
  /**
   * @description Idk why section list does not perform update
   *              Need to find more elegant way to do this
   * @param {number} varId
   */
  const broadcast = (varId?: string) => {
    dispatch(setFocusedVarId(null));
    if (varId) {
      timeoutRef.current = setTimeout(() => {
        dispatch(setFocusedVarId(varId));
      }, 0);
    }
  };
  const changeVarName = (newName?: string) => {
    if (!newName) return;
    batch(() => {
      focusedVar?.setVarName(newName);
      if (focusedVarId) broadcast(focusedVarId);
    });
  };

  const changeVarValue = (newValue?: string) => {
    if (!newValue) return;
    batch(() => {
      focusedVar?.setValue(Number(newValue) ?? -1);
      if (focusedVarId) broadcast(focusedVarId);
    });
  };

  const deleteVar = () => {
    focusedVar?.deleteSelf();
  };
  const lock = focusedVar?.isSensor || focusedVar?.varType === 'input';
  const renderFooter: AuxFooter = () => (
    <AuxDeleteButton lock={lock} onPress={deleteVar} />
  );
  if (!focusedVar) {
    return <Placeholder text="선택된 항목 없음" />;
  }
  return (
    <AuxWrapper renderFooter={renderFooter}>
      <AuxSection style={styles.wrapper}>
        <Label value="변수 이름" />
        <RoundedInput
          defaultValue={focusedVar?.varName ?? 'variable'}
          onActionsPress={changeVarName}
          onSubmit={changeVarName}
          lock={lock}
          style={styles.input}
          contentContainerStyle={styles.inputText}
          submit={true}
        />
      </AuxSection>
      <AuxSection style={styles.wrapper} last={true}>
        <Label value="값" />
        <RoundedInput
          onActionsPress={changeVarValue}
          onSubmit={changeVarValue}
          defaultValue={displayVarNameHandler(focusedVar?.value)}
          lock={lock}
          style={[st.bgColor(ColorPalette.deepBlue), styles.input]}
          contentContainerStyle={[
            styles.inputText,
            st.fontColor(ColorPalette.white),
            inputTextStyle,
          ]}
          keyboardType={'numeric'}
          submit={true}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </AuxSection>
    </AuxWrapper>
  );
};

export default AuxVariable;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
  },
  input: {
    marginTop: 5,
  },
  inputText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
