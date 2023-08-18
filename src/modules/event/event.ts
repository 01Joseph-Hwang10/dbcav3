import {handleError} from '../../tools/debug';

type Event<T> = (data: T) => void;

class _EventRegistry {
  private events: Record<string, Event<any>> = {};

  public on<T = any>(eventName: string, callback: Event<T>): string {
    this.events[eventName] = callback;
    return eventName;
  }

  public remove(eventName: string) {
    delete this.events[eventName];
  }

  public removeAll() {
    this.events = {};
  }

  public emit<T = any>(eventName: string, data?: T, strict?: boolean) {
    const event = this.events[eventName];
    if (event) {
      event(data);
      return;
    }
    if (strict) {
      handleError(`Event ${eventName} not found`);
    }
  }
}

export const EventRegistry = new _EventRegistry();

export namespace Event {
  /**
   *
   * @param {string} ref
   * @returns {string} eventId
   *
   * @descripiton Returns the eventId for the event onChangeInputVars
   *              This event does not need data to be emitted
   */
  export const onChangeInputVars = (ref: string) => `onChangeInputVars:${ref}`;
  /**
   *
   * @returns {string} eventId
   *
   * @description Returns the eventId for the event onChangeOption
   *              This event requires @param {Event<import('@src/components/editor/palette/option-list/option-list.utils')>} callback as a callback
   */
  export const onChangeOption = () => 'onChangeOption';
  /**
   *
   * @returns {string} eventId
   *
   * @description Returns the eventId for the event onChangeMotor
   *              This event does not need data to be emitted
   */
  export const onChangeMotor = () => 'onChangeMotor';
}
