import {Calculation} from '@src/modules/block-definitions/functions/blocks/assign';
import {calculationData} from '@src/redux/queries/options';
import {Nullable} from '@src/utils/types';

export const getCalculation = (calculation: Nullable<Calculation>): string =>
  calculationData.find(([name]) => calculation === name)?.[1] ?? '';
