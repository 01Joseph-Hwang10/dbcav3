import {ColorPalette} from '@src/themes/colors';
import {switchHandler} from '@src/tools/handlers';
import {useState} from 'react';
import {Platform, TextStyle, ViewStyle} from 'react-native';

interface IUseInputTextStyle {
  inputTextStyle: TextStyle & ViewStyle;
  onFocus: () => void;
  onBlur: () => void;
}

export const useInputTextStyle = (): IUseInputTextStyle => {
  const [focus, setFocus] = useState<boolean>(false);
  const inputTextStyle: TextStyle = {
    color: switchHandler(
      Platform.OS === 'ios',
      ColorPalette.whitesmoke,
      switchHandler(focus, ColorPalette.black, ColorPalette.whitesmoke),
    ),
  };
  const onFocus = () => setFocus(true);
  const onBlur = () => setFocus(false);
  return {
    inputTextStyle,
    onFocus,
    onBlur,
  };
};
