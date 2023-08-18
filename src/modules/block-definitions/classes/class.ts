import {Nullable} from '@src/utils/types';
import {OOPBlock} from '../block';
import {ClassConfig} from './config';

export class ClassBlock {
  blocks: Nullable<OOPBlock>[];
  config: ClassConfig;

  constructor(className: string) {
    this.blocks = [];
    this.config = new ClassConfig(className);
  }
}
