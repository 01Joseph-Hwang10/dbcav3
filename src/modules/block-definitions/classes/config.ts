import {AbstractBlock, BlockName} from '../base/base';

export class ClassConfig extends AbstractBlock {
  name: BlockName = 'config';
  className: string;

  constructor(className: string) {
    super('class');
    this.className = className;
  }
}
