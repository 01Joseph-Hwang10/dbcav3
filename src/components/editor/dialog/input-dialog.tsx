import {useInputTextStyle} from '@src/hooks/useInputTextStyle';
import {setInputOpened} from '@src/redux/slices/editor';
import {ColorPalette} from '@src/themes/colors';
import {Event, EventRegistry} from '@src/modules/event/event';
import {switchHandler} from '@src/tools/handlers';
import React, {useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  IOptionItem,
  OptionItem,
} from '../palette/option-list/option-list.utils';
import {st} from '@src/themes/styles';
import Center from '@src/components/common/styled/center';
import {Bold, Span} from '@src/components/common/styled/text';
import styled from 'styled-components/native';
import Fill from '@src/components/common/styled/fill';
import {withOpacity} from '@src/tools/string-tools';

const TitleSection = styled.View`
  padding: 5px 0px;
  margin-bottom: 30px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

const InputSection = styled.View`
  width: 100%;
  border-bottom-width: 2px;
  border-bottom-color: ${ColorPalette.gray};
`;

const ButtonSection = styled(Fill)`
  justify-content: flex-end;
  flex-direction: row;
  margin-top: 15px;
`;

const Container = styled(Center)`
  width: 350px;
  height: 200px;
  background-color: ${withOpacity(ColorPalette.deepBlue, 0.7)};
  border-radius: 5px;
  padding: 10px;
`;

interface PButton {
  onPress: () => void;
  color: string;
}

const Button: React.FC<PButton> = ({children, onPress, color}) => (
  <TouchableOpacity onPress={onPress}>
    <Center style={styles.button}>
      <Span size={20} weight="600" color={color}>
        {children}
      </Span>
    </Center>
  </TouchableOpacity>
);

const InputDialog: React.FC = () => {
  const [text, setText] = useState<string>('');
  const inputRef = useRef<TextInput>(null);
  const {inputTextStyle, onFocus, onBlur} = useInputTextStyle();
  const inputOpened = useSelector(
    (state: RootState) => state.editor.inputOpened,
  );
  const dispatch = useDispatch();
  const onCancel = () => dispatch(setInputOpened(false));
  const onSubmit = () => {
    EventRegistry.emit<IOptionItem>(
      Event.onChangeOption(),
      new OptionItem({
        type: 'input',
        displayName: text,
        /**
         * @description This implemetation was done since in current situation there are only integer data types.
         *              This should be changed in the future when more data types are supported.
         */
        data: Number(text),
      }),
    );
    onCancel();
  };
  return (
    <Modal
      visible={inputOpened}
      transparent={true}
      onRequestClose={onCancel}
      onDismiss={onCancel}>
      <KeyboardAvoidingView
        behavior={switchHandler(Platform.OS === 'ios', 'padding', 'height')}
        style={[st.fill, st.center]}>
        <Container>
          <TitleSection>
            <Bold size={20} color={ColorPalette.whitesmoke}>
              입력값에 넣을 값을 입력해주세요
            </Bold>
          </TitleSection>
          <InputSection>
            <TextInput
              style={[styles.input, inputTextStyle]}
              ref={inputRef}
              placeholder="값"
              onChangeText={setText}
              value={text}
              placeholderTextColor={ColorPalette.gray}
              keyboardType="number-pad"
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </InputSection>
          <ButtonSection>
            <Button onPress={onCancel} color={ColorPalette.red}>
              취소
            </Button>
            <Button onPress={onSubmit} color={ColorPalette.lightTeal}>
              확인
            </Button>
          </ButtonSection>
        </Container>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default InputDialog;

const styles = StyleSheet.create({
  input: {
    margin: 0,
    paddingHorizontal: 5,
    paddingVertical: 10,
    fontSize: 22,
  },
  button: {
    paddingVertical: 10,
    width: 50,
  },
});
