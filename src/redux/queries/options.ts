import {
  OptionData,
  OptionItem,
  OptionType,
} from '@src/components/editor/palette/option-list/option-list.utils';
import {Calculation} from '@src/modules/block-definitions/functions/blocks/assign';
import {FuncRef} from '@src/modules/block-definitions/functions/func-ref';
import {Flow} from '@src/modules/block-definitions/functions/blocks/if';
import {getVariables} from './workspace';
import {VarRef} from '@src/modules/block-definitions/variables/var-ref';
import {CallFunctionBlock} from '@src/modules/block-definitions/functions/blocks/call-function';
import {Comparer} from '@src/modules/block-definitions/functions/blocks/condition';

type ComparerData = [Comparer, string][];

export const compaererData: ComparerData = [
  ['eq', '='],
  ['neq', '≠'],
  ['gt', '>'],
  ['gte', '≥'],
  ['lt', '<'],
  ['lte', '≤'],
];

const getComperer = (): ComparerData => compaererData;

// getVaraibles -> ./workspace.ts

type CalculationData = [Calculation, string][];

export const calculationData: CalculationData = [
  ['add', '+'],
  ['subtract', '-'],
  ['multiply', 'x'],
  ['divide', '÷'],
  ['modulo', '%'],
];

const getCalculations = (): CalculationData => calculationData;

const getFunctions = (state: RootState) => state.workspace.functions;

const blockFlows: Flow[] = new Array(8).fill(null).map(
  (_, index) =>
    new Flow({
      type: 'block',
      blockNumber: index + 1,
    }),
);

// const keywordFlows: Flow[] = (['break', 'continue'] as FlowType[]).map(
//   type =>
//     new Flow({
//       type,
//     }),
// );

const getFlows = (state: RootState): Flow[] => {
  const functionFlows = state.workspace.functions.map(
    func =>
      new Flow({
        type: 'function',
        callbackBlock: new CallFunctionBlock(func.id),
      }),
  );
  /**
   * @todo: Add support for keyword flow types
   */
  return [
    // ...keywordFlows,
    ...blockFlows,
    ...functionFlows,
  ];
};

const getCalculationOptions = () =>
  getCalculations().map(
    ([data, displayName]) =>
      new OptionItem({
        type: 'calculation',
        displayName,
        data,
      }),
  );

const getCompareOptions = () =>
  getComperer().map(
    ([data, displayName]) =>
      new OptionItem({
        type: 'comparer',
        displayName,
        data,
      }),
  );

const getFlowType = (flow: Flow): OptionType => {
  switch (flow.type) {
    case 'continue':
    case 'break':
      return 'keyword';
    default:
      return flow.type;
  }
};

const getFlowOptions = (state: RootState) =>
  getFlows(state).map(
    flow =>
      new OptionItem({
        type: getFlowType(flow),
        displayName: flow.type,
        data: flow,
      }),
  );

const getVariableOptions = (state: RootState) =>
  getVariables(state).map(
    variable =>
      new OptionItem({
        type: 'variable',
        displayName: variable.varName,
        data: new VarRef(variable),
      }),
  );

const getFunctionOptions = (state: RootState) =>
  getFunctions(state).map(
    func =>
      new OptionItem({
        type: 'function',
        displayName: func.funcName,
        data: new FuncRef(func),
      }),
  );

const rawOption = new OptionItem({
  type: 'input',
  displayName: '직접 입력',
  data: null,
});

const nullOption = new OptionItem({
  type: 'null',
  displayName: '없음',
  data: 'null' as OptionData,
});

const iteratorOption = new OptionItem({
  type: 'iterator',
  displayName: '이터레이터',
  data: 'iterator' as OptionData,
});

export const getOptions = (state: RootState): OptionItem[] => {
  const optionMode = state.editor.optionMode;
  if (optionMode.find(mode => mode === 'flow!')) {
    return getFlowOptions(state);
  }
  let options: OptionItem[] = [];
  optionMode.forEach(optionScope => {
    switch (optionScope) {
      case 'calculation':
        options.push(...getCalculationOptions());
        break;
      case 'compare':
        options.push(...getCompareOptions());
        break;
      case 'variable':
        options.push(...getVariableOptions(state));
        break;
      case 'function':
        options.push(...getFunctionOptions(state));
        break;
      case 'raw':
        options.push(rawOption);
        break;
      case 'null':
        options.push(nullOption);
        break;
      case 'iterator':
        options.push(iteratorOption);
        break;
    }
  });
  if (optionMode.find(mode => mode === '!sensor')) {
    options = options.filter(option => {
      if (
        option.type === 'variable' &&
        (option.data as VarRef).refVar?.isSensor
      ) {
        return false;
      }
      return true;
    });
  }
  return options;
};
