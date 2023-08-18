import {Nullable} from '@src/utils/types';
import {v1 as uuidv1} from 'uuid';
import {AAbstractBlock, AbstractBlock, BlockName} from '../../base/base';
import {FunctionBlock} from '../function';
import {FuncRef} from '../func-ref';
import {VarRef} from '../../variables/var-ref';
import {processFuncRef} from '../../helpers';

export type Calculation = 'add' | 'subtract' | 'multiply' | 'divide' | 'modulo';

export type Calculatee = Nullable<VarRef | number>;

export interface IAssignment {
  id: string;
  variable?: VarRef;
  left?: Calculatee;
  calculation?: Nullable<Calculation>;
  right?: Calculatee;
  blockRef: string;
  funcRef: FuncRef;
}

export class Assignment {
  id: string;
  variable?: VarRef;
  left?: Calculatee;
  calculation?: Nullable<Calculation>;
  right?: Calculatee;
  blockRef: string;
  funcRef: FuncRef;

  constructor(
    options: Omit<IAssignment, 'id'> & Partial<Pick<IAssignment, 'id'>>,
  ) {
    this.id = options.id ?? uuidv1();
    this.variable = options?.variable;
    this.left = options?.left ?? 0;
    this.calculation = options?.calculation ?? 'add';
    this.right = options?.right ?? 0;
    this.blockRef = options.blockRef;
    this.funcRef = options.funcRef;
  }

  setVariable(variable: VarRef) {
    this.actionChain(() => {
      this.variable = variable;
    });
  }

  setLeft(left: Calculatee) {
    this.actionChain(() => {
      this.left = left;
    });
  }

  setRight(right: Calculatee) {
    this.actionChain(() => {
      this.right = right;
    });
  }

  setCalculation(calculation: Calculation) {
    this.actionChain(() => {
      this.calculation = calculation;
    });
  }

  actionChain(actions: () => void) {
    actions();
    const refBlock = this.funcRef.refFunc?.blocks.find(
      block => block && block.id === this.blockRef,
    );
    if (refBlock?.name === 'assign') {
      (refBlock as AssignBlock).updateAssignment(this);
    }
  }
}

abstract class AAssignBlock extends AAbstractBlock {
  abstract assignments: Assignment[];
}

export class AssignBlock extends AbstractBlock implements AAssignBlock {
  constructor(ref: string | FunctionBlock, options?: Partial<AAssignBlock>) {
    super(options?.funcRef ?? processFuncRef(ref), options?.id);
    this.assignments = options?.assignments ?? [];
  }

  name: BlockName = 'assign';
  assignments: Assignment[];

  getAssignment(id: string): Nullable<Assignment> {
    return this.assignments.find(assignment => assignment.id === id);
  }

  createAssignment(assignment?: Assignment) {
    this.actionChain(() => {
      if (assignment) {
        this.assignments.push(assignment);
      } else {
        this.assignments.push(
          new Assignment({
            blockRef: this.id,
            funcRef: this.funcRef!,
          }),
        );
      }
    });
  }

  private findAssignmentIndexById(id: string): number {
    const index = this.assignments.findIndex(
      assignment => assignment.id === id,
    );
    if (index < 0) {
      return 0; // Needs error handling
    }
    return index;
  }

  updateAssignment(newAssignment: Assignment) {
    this.actionChain(() => {
      const index = this.findAssignmentIndexById(newAssignment.id);
      this.assignments[index] = newAssignment;
    });
  }

  deleteAssignment(assignment: Assignment | string) {
    this.actionChain(() => {
      const index = this.findAssignmentIndexById(
        typeof assignment === 'string' ? assignment : assignment.id,
      );
      this.assignments.splice(index, 1);
    });
  }

  actionChain(actions: () => void) {
    actions();
    this.funcRef!.refFunc?.setBlock(this);
  }
}
