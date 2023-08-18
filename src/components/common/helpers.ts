import {ColorPalette} from '@src/themes/colors';
import {Platform, ViewStyle} from 'react-native';

export const opacityCoefficient = 0.01745455;
export const opacityIntercept = 0.164;
export const radiusCoefficient = 0.6534348;
export const radiusIntercept = 0.02873188;

export const commonIconSize = Platform.OS === 'ios' ? 40 : 36;

export const linearEquation = (a: number, b: number, x: number): number =>
  a * x + b;

export const getShadowStyle = (shadowLevel: number): ViewStyle => {
  if (Platform.OS === 'android') {
    return {
      elevation: shadowLevel,
    };
  }
  if (Platform.OS === 'ios') {
    return {
      shadowColor: ColorPalette.black,
      shadowOpacity: linearEquation(
        opacityCoefficient,
        opacityIntercept,
        shadowLevel,
      ),
      shadowOffset: {
        width: 0,
        height: shadowLevel === 1 ? 1 : Math.floor(shadowLevel / 2),
      },
      shadowRadius: linearEquation(
        radiusCoefficient,
        radiusIntercept,
        shadowLevel,
      ),
    };
  }
  return {};
};
