import {InsetsData, getInsetStyle} from '@src/themes/utils';
import {FlexStyle, TextStyle, ViewStyle} from 'react-native';

export namespace st {
  export const center: ViewStyle = {
    justifyContent: 'center',
    alignItems: 'center',
  };

  export const between: ViewStyle = {
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  export const row: ViewStyle = {
    flexDirection: 'row',
  };

  export const col: ViewStyle = {
    flexDirection: 'column',
  };

  export const flex = (flexNumber: number): ViewStyle => ({
    flex: flexNumber,
  });

  export const w = (width: number | string): ViewStyle => ({
    width,
  });

  export const h = (height: number | string): ViewStyle => ({
    height,
  });

  export const justify = (
    justifyContent: FlexStyle['justifyContent'],
  ): ViewStyle => ({
    justifyContent,
  });

  export const align = (alignItems: FlexStyle['alignItems']): ViewStyle => ({
    alignItems,
  });

  export const fill: ViewStyle = {
    flex: 1,
    width: '100%',
    height: '100%',
  };

  export const wFull: ViewStyle = {
    flex: 1,
    width: '100%',
  };

  export const hFull: ViewStyle = {
    flex: 1,
    height: '100%',
  };

  export const insets = (insetData: InsetsData): ViewStyle =>
    getInsetStyle(insetData);

  export const insetsVertical = (
    insetData: Omit<InsetsData, 'direction'>,
  ): ViewStyle => getInsetStyle({...insetData, direction: 'vertical'});

  export const insetsHorizontal = (
    insetData: Omit<InsetsData, 'direction'>,
  ): ViewStyle => getInsetStyle({...insetData, direction: 'horizontal'});

  export const bgColor = (color: string): ViewStyle => ({
    backgroundColor: color,
  });

  export const fontColor = (color: string): TextStyle => ({
    color,
  });

  export const fontSize = (size: number): TextStyle => ({
    fontSize: size,
  });

  export const fontWeight = (weight: TextStyle['fontWeight']): TextStyle => ({
    fontWeight: weight,
  });

  export const textAlign = (_textAlign: TextStyle['textAlign']): TextStyle => ({
    textAlign: _textAlign,
  });

  export const pl = (paddingLeft: number): ViewStyle => ({
    paddingLeft,
  });

  export const pr = (paddingRight: number): ViewStyle => ({
    paddingRight,
  });

  export const pt = (paddingTop: number): ViewStyle => ({
    paddingTop,
  });

  export const pb = (paddingBottom: number): ViewStyle => ({
    paddingBottom,
  });

  export const px = (paddingHorizontal: number): ViewStyle => ({
    paddingHorizontal,
  });

  export const py = (paddingVertical: number): ViewStyle => ({
    paddingVertical,
  });

  export const p = (padding: number): ViewStyle => ({
    padding,
  });

  export const m = (margin: number): ViewStyle => ({
    margin,
  });

  export const mt = (marginTop: number): ViewStyle => ({
    marginTop,
  });

  export const mb = (marginBottom: number): ViewStyle => ({
    marginBottom,
  });

  export const ml = (marginLeft: number): ViewStyle => ({
    marginLeft,
  });

  export const mr = (marginRight: number): ViewStyle => ({
    marginRight,
  });

  export const mx = (marginHorizontal: number): ViewStyle => ({
    marginHorizontal,
  });

  export const my = (marginVertical: number): ViewStyle => ({
    marginVertical,
  });

  export const border = {
    color: (borderColor: string): ViewStyle => ({
      borderColor,
    }),
    w: (borderWidth: number): ViewStyle => ({
      borderWidth,
    }),
    t: {
      color: (topBorderColor: string): ViewStyle => ({
        borderTopColor: topBorderColor,
      }),
      w: (topBorderWidth: number): ViewStyle => ({
        borderTopWidth: topBorderWidth,
      }),
      radius: (topBorderRadius: number): ViewStyle => ({
        borderTopLeftRadius: topBorderRadius,
        borderTopRightRadius: topBorderRadius,
      }),
    },
    b: {
      color: (bottomBorderColor: string): ViewStyle => ({
        borderBottomColor: bottomBorderColor,
      }),
      w: (bottomBorderWidth: number): ViewStyle => ({
        borderBottomWidth: bottomBorderWidth,
      }),
      radius: (bottomBorderRadius: number): ViewStyle => ({
        borderBottomLeftRadius: bottomBorderRadius,
        borderBottomRightRadius: bottomBorderRadius,
      }),
    },
    l: {
      color: (leftBorderColor: string): ViewStyle => ({
        borderLeftColor: leftBorderColor,
      }),
      w: (leftBorderWidth: number): ViewStyle => ({
        borderLeftWidth: leftBorderWidth,
      }),
      radius: (leftBorderRadius: number): ViewStyle => ({
        borderTopLeftRadius: leftBorderRadius,
        borderBottomLeftRadius: leftBorderRadius,
      }),
    },
    r: {
      color: (rightBorderColor: string): ViewStyle => ({
        borderRightColor: rightBorderColor,
      }),
      w: (rightBorderWidth: number): ViewStyle => ({
        borderRightWidth: rightBorderWidth,
      }),
      radius: (rightBorderRadius: number): ViewStyle => ({
        borderTopRightRadius: rightBorderRadius,
        borderBottomRightRadius: rightBorderRadius,
      }),
    },
    tr: {
      radius: (topRightBorderRadius: number): ViewStyle => ({
        borderTopRightRadius: topRightBorderRadius,
      }),
    },
    tl: {
      radius: (topLeftBorderRadius: number): ViewStyle => ({
        borderTopLeftRadius: topLeftBorderRadius,
      }),
    },
    br: {
      radius: (bottomRightBorderRadius: number): ViewStyle => ({
        borderBottomRightRadius: bottomRightBorderRadius,
      }),
    },
    bl: {
      radius: (bottomLeftBorderRadius: number): ViewStyle => ({
        borderBottomLeftRadius: bottomLeftBorderRadius,
      }),
    },
  };

  export const absolute: ViewStyle = {
    position: 'absolute',
  };

  export const relative: ViewStyle = {
    position: 'relative',
  };

  export const t = (top: number): ViewStyle => ({
    top,
  });

  export const b = (bottom: number): ViewStyle => ({
    bottom,
  });

  export const l = (left: number): ViewStyle => ({
    left,
  });

  export const r = (right: number): ViewStyle => ({
    right,
  });

  export const z = (zIndex: number): ViewStyle => ({
    zIndex,
  });

  export const rounded = (radius: number): ViewStyle => ({
    borderRadius: radius,
  });
}
