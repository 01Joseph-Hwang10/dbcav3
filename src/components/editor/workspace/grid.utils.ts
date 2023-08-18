import {KeywordBlock} from '@src/modules/block-definitions/block';
import {ColorPalette} from '@src/themes/colors';
import {withOpacity} from '@src/tools/string-tools';
import {Nullable} from '@src/utils/types';

export const gridSize = 270;
export const gridBlockSize = gridSize / 3;
export const gridBorderRadius = 10;
export const gridBorderWidth = 2;
export const gridBorderColor = ColorPalette.black;

/**
 *
 * @param {Nullable<KeywordBlock | string>} block
 * @returns {string}
 *
 * @description Returns a primary color.
 */
export const getBlockColor = (
  block: Nullable<KeywordBlock | string>,
): Nullable<string> => {
  if (!block) return null;
  const blockName = typeof block === 'string' ? block : block.name;
  switch (blockName) {
    case 'if':
    case 'for':
    case 'while':
    case 'end':
      return ColorPalette.violet;
    case 'assign':
      return ColorPalette.skyblue;
    case 'function':
      return ColorPalette.gold;
    case 'motor':
    case 'wait':
    case 'control':
      return ColorPalette.green;
    case 'config':
      return withOpacity(ColorPalette.teal, 0.5);
    default:
      return null;
  }
};

/**
 *
 * @param {Nullable<KeywordBlock | string>} block
 * @returns {[Nullable<string>, Nullable<string>]}
 *
 * @description Returns an array with two items.
 *              First is primary color, second is secondary.
 */
export const getBlockTheme = (
  block: Nullable<KeywordBlock | string>,
): [Nullable<string>, Nullable<string>] => {
  if (!block) return [null, null];
  const blockName = typeof block === 'string' ? block : block.name;
  switch (blockName) {
    case 'if':
    case 'for':
    case 'while':
    case 'end':
      return [ColorPalette.violet, ColorPalette.purple];
    case 'assign':
      return [ColorPalette.skyblue, ColorPalette.deepBlue];
    case 'function':
      return [ColorPalette.gold, ColorPalette.yellow];
    case 'motor':
    case 'wait':
    case 'control':
      return [ColorPalette.green, ColorPalette.teal];
    case 'config':
      return [
        withOpacity(ColorPalette.teal, 0.5),
        withOpacity(ColorPalette.lightTeal, 1),
      ];
    default:
      return [null, null];
  }
};
