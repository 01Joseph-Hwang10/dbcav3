import {StyleMixin} from '@src/utils/types';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import {ColorPalette} from '@src/themes/colors';
import {ActionsMixin, LeadingMixin} from '../button/button.utils';
import {renderLeading} from '../button/leading';
import {renderActions} from '../button/actions';
import {st} from '@src/themes/styles';

interface PRoundedInput extends StyleMixin, LeadingMixin, ActionsMixin {
  placeholder?: string;
  defaultValue?: string;
  onSubmit?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  keyboardType?: KeyboardTypeOptions;
  required?: boolean;
}

const RoundedInput: React.FC<PRoundedInput> = props => {
  const {
    onSubmit,
    onFocus,
    onBlur,
    defaultValue,
    contentContainerStyle,
    lock,
    style,
    placeholder,
    keyboardType,
    onActionsPress: onActionsPressCallback,
    required,
  } = props;
  const inputRef = useRef<TextInput>(null);
  const [text, setText] = useState<string>(defaultValue ?? '');
  const onSubmitEditing = ({
    nativeEvent: {text: submitText},
  }: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    if (required && !submitText) {
      Alert.alert('입력값을 입력해주세요');
      return;
    }
    onSubmit && onSubmit(submitText);
    onBlur && onBlur();
  };
  useEffect(() => {
    setText(defaultValue ?? '');
  }, [defaultValue]);
  const onActionsPress = () => {
    onActionsPressCallback && onActionsPressCallback(text);
    inputRef.current?.blur();
  };
  return (
    <View style={[styles.root, style]}>
      <View style={[styles.side, st.center]}>{renderLeading(props)}</View>
      <TextInput
        ref={inputRef}
        style={[styles.textInput, contentContainerStyle]}
        onChangeText={setText}
        value={text}
        placeholder={placeholder ?? ''}
        editable={!lock}
        selectTextOnFocus={!lock}
        onSubmitEditing={onSubmitEditing}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholderTextColor={ColorPalette.gray}
        textAlign={'center'}
        keyboardType={keyboardType}
      />
      <View style={[styles.side, st.center]}>
        {renderActions({
          ...props,
          onActionsPress: onActionsPress,
        })}
      </View>
    </View>
  );
};

export default RoundedInput;

const styles = StyleSheet.create({
  textInput: {
    margin: 0,
    color: ColorPalette.black,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '80%',
  },
  root: {
    width: '100%',
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: ColorPalette.white,
  },
  side: {
    width: '10%',
  },
});
