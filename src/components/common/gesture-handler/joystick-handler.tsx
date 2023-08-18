import {Nullable, PosSpec, StyleMixin} from '@src/utils/types';
import React from 'react';
import {View} from 'react-native';
import {
  Directions,
  LongPressGestureHandler,
  LongPressGestureHandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';

interface PJoystickHandler extends StyleMixin {
  onPressIn?: () => void;
  onLongPressIn?: () => void;
  onPressOut?: (direction?: Directions) => void;
  onChangeDirection?: (direction?: Directions) => void;
  delay?: number;
}

interface SJoystickHandler {
  currentDirection: Nullable<Directions>;
}

const triggerDistance = 20;

const decideDirection = ({x, y}: PosSpec): Nullable<Directions> => {
  if (Math.abs(x) > Math.abs(y)) {
    if (x > triggerDistance) {
      return Directions.RIGHT;
    }
    if (x < triggerDistance * -1) {
      return Directions.LEFT;
    }
  } else {
    if (y > triggerDistance) {
      return Directions.DOWN;
    }
    if (y < triggerDistance * -1) {
      return Directions.UP;
    }
  }
  return null;
};

class JoystickHandler extends React.Component<
  PJoystickHandler,
  SJoystickHandler
> {
  private longPressRef = React.createRef<LongPressGestureHandler>();
  private panRef = React.createRef<PanGestureHandler>();
  private delayRef = React.createRef<NodeJS.Timeout | null>(); // eslint-disable-line no-undef

  public state: SJoystickHandler = {
    currentDirection: null,
  };

  constructor(props: PJoystickHandler) {
    super(props);
    // @ts-ignore
    this.delayRef.current = null;
  }

  private startTimer = () => {
    const {delay, onLongPressIn} = this.props;
    if (delay) {
      // @ts-ignore
      this.delayRef.current = setTimeout(() => {
        onLongPressIn && onLongPressIn();
      }, delay);
    } else {
      onLongPressIn && onLongPressIn();
    }
  };

  private clearTimer = () => {
    if (this.delayRef.current) {
      clearTimeout(this.delayRef.current);
    }
  };

  private setCurrentDirection = (direction?: Nullable<Directions>) => {
    this.setState({currentDirection: direction});
  };

  private onPanHandlerStateChange = ({
    nativeEvent: {oldState, translationX: x, translationY: y},
  }: PanGestureHandlerStateChangeEvent) => {
    const {onPressOut} = this.props;
    if (oldState === State.ACTIVE) {
      const direction = decideDirection({x, y}) ?? undefined;
      onPressOut && onPressOut(direction);
      this.setCurrentDirection(null);
    }
  };

  private onLongPressHandlerStateChange = ({
    nativeEvent: {state, oldState},
  }: LongPressGestureHandlerStateChangeEvent) => {
    const {onPressIn, onPressOut} = this.props;
    if (state === State.ACTIVE) {
      onPressIn && onPressIn();
      this.startTimer();
    }
    if (oldState === State.ACTIVE) {
      onPressOut && onPressOut(undefined);
      this.clearTimer();
    }
  };

  private onPanGestureEvent = ({
    nativeEvent: {translationX: x, translationY: y},
  }: PanGestureHandlerGestureEvent) => {
    const direction = decideDirection({x, y}) ?? undefined;
    const {onChangeDirection} = this.props;
    const {currentDirection} = this.state;
    if (currentDirection !== direction) {
      this.setCurrentDirection(direction);
      onChangeDirection && onChangeDirection(direction);
    }
  };

  render = () => {
    const {children, style} = this.props;
    return (
      <LongPressGestureHandler
        onHandlerStateChange={this.onLongPressHandlerStateChange}
        minDurationMs={0}
        maxDist={triggerDistance * 2}
        ref={this.longPressRef}
        simultaneousHandlers={[this.panRef]}>
        <View style={style}>
          <PanGestureHandler
            ref={this.panRef}
            simultaneousHandlers={[this.longPressRef]}
            onHandlerStateChange={this.onPanHandlerStateChange}
            onGestureEvent={this.onPanGestureEvent}>
            <View style={style}>{children}</View>
          </PanGestureHandler>
        </View>
      </LongPressGestureHandler>
    );
  };
}

export default JoystickHandler;
