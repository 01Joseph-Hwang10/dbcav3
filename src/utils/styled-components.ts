// styled-components.ts
import {ThemeInterface} from '@src/themes';
import * as styledComponents from 'styled-components/native';

const {
  default: styled,
  css,
  ThemeProvider,
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<ThemeInterface>;

export {css, ThemeProvider};
export default styled;
