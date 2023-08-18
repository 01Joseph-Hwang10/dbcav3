import {Event, EventRegistry} from '@src/modules/event/event';
import {getMotorNumbers} from '@src/redux/queries/drone';
import store from '@src/redux/store';
import {AAbstractBlock, AbstractBlock, BlockName} from '../../base/base';
import {FunctionBlock} from '../function';
import {processFuncRef} from '../../helpers';
import {VarRef} from '../../variables/var-ref';
import {calculateRCInfo, RCInfo} from './rc';

/**
 * @description First one is motor port number, second is thrust
 */
export interface MotorDatum {
  portNumber: number;
  thrust: number | VarRef;
}

abstract class AMotorBlock extends AAbstractBlock {
  abstract name: BlockName;
  abstract motors: MotorDatum[];
}

export class MotorBlock extends AbstractBlock implements AMotorBlock {
  constructor(ref: string | FunctionBlock, options?: Partial<AMotorBlock>) {
    super(options?.funcRef ?? processFuncRef(ref), options?.id);
    this.motors = options?.motors ?? this.updateMotors();
    EventRegistry.on(Event.onChangeMotor(), this.updateMotors);
  }

  name: BlockName = 'motor';
  motors: MotorDatum[] = [];
  private initialThrust = 1000;

  updateMotors() {
    const motors = getMotorNumbers(store.state);
    return motors.map(motor => ({
      portNumber: motor,
      thrust: this.initialThrust,
    }));
  }

  private findMotorByPortNumber(portNumber: number) {
    const index = this.motors.findIndex(
      motor => motor.portNumber === portNumber,
    );
    if (index < 0) {
      return 0;
    }
    return index;
  }

  get rcInfo(): RCInfo {
    return calculateRCInfo(this.motors);
  }

  setThrust(motorDatum: MotorDatum) {
    this.actionChain(() => {
      const index = this.findMotorByPortNumber(motorDatum.portNumber);
      this.motors[index] = motorDatum;
    });
  }

  actionChain(actions: () => void) {
    actions();
    this.funcRef!.refFunc?.setBlock(this);
  }
}
