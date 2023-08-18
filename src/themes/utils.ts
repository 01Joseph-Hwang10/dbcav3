import {Platform, ViewStyle} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';

type EdgeInsetDirection =
  | Direction
  | 'exceptLeft'
  | 'exceptRight'
  | 'exceptTop'
  | 'exceptBottom'
  | 'topRight'
  | 'topLeft'
  | 'bottomRight'
  | 'bottomLeft'
  | 'vertical'
  | 'horizontal'
  | 'all';

type Direction = 'top' | 'bottom' | 'left' | 'right';

type EdgeInsetKeys =
  | 'marginLeft'
  | 'marginRight'
  | 'marginTop'
  | 'marginBottom'
  | 'paddingLeft'
  | 'paddingRight'
  | 'paddingTop'
  | 'paddingBottom';

export interface InsetsData {
  insets: EdgeInsets;
  direction: EdgeInsetDirection;
  margin?: boolean;
  extraInsets?: Partial<Record<Direction, number>>;
}

export const getInsetStyle = ({
  insets,
  direction,
  margin = Platform.OS === 'android',
  extraInsets,
}: InsetsData): ViewStyle => {
  let directions: Record<Direction, boolean> = {
    bottom: false,
    top: false,
    left: false,
    right: false,
  };
  const allTrueDirections = {bottom: true, top: true, left: true, right: true};
  switch (direction) {
    case 'all':
    case 'exceptBottom':
    case 'exceptLeft':
    case 'exceptRight':
    case 'exceptTop':
      directions = allTrueDirections;
    case 'exceptBottom': // eslint-disable-line
      directions.bottom = false;
    case 'exceptLeft': // eslint-disable-line
      directions.left = false;
    case 'exceptRight': // eslint-disable-line
      directions.right = false;
    case 'exceptTop': // eslint-disable-line
      directions.top = false;
      break;
    case 'vertical':
      directions.top = true;
      directions.bottom = true;
      break;
    case 'horizontal':
      directions.left = true;
      directions.right = true;
      break;
    case 'bottom':
    case 'bottomLeft':
    case 'bottomRight':
      directions.bottom = true;
    case 'top': // eslint-disable-line
    case 'topRight':
    case 'topLeft':
      directions.top = true;
    case 'left': // eslint-disable-line
    case 'topLeft':
    case 'bottomLeft':
      directions.left = true;
    case 'right': // eslint-disable-line
    case 'topRight':
    case 'bottomRight':
      directions.right = true;
      break;
    default:
      break;
  }
  const style: ViewStyle = {};
  const directionStyleMapper = ([key, value]: [string, boolean]) => {
    if (value) {
      const styleKey = `${
        margin ? 'margin' : 'padding'
      }${key.capitalize()}` as EdgeInsetKeys;
      const inset = insets[key as Direction];
      style[styleKey] = inset;
      const extraInset = extraInsets?.[key as Direction];
      if (extraInset) {
        style[styleKey] = (style[styleKey] as number) + extraInset;
      }
    }
  };
  Object.entries(directions).forEach(directionStyleMapper);
  return style;
};
