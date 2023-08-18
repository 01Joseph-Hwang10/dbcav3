import {PosSpec} from '@src/utils/types';
import React from 'react';
import {
  State,
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';

interface PTapPositionHandler {
  onTap: (tappedPosition: PosSpec) => void;
}

const TapPositionHandler: React.FC<PTapPositionHandler> = ({
  children,
  onTap,
}) => {
  const onTapHandlerStateChange = ({
    nativeEvent: {oldState, absoluteX, absoluteY},
  }: TapGestureHandlerStateChangeEvent) => {
    if (oldState === State.ACTIVE) {
      const tappedPosition: PosSpec = {x: absoluteX, y: absoluteY};
      onTap(tappedPosition);
    }
  };
  return (
    <TapGestureHandler onHandlerStateChange={onTapHandlerStateChange}>
      {children}
    </TapGestureHandler>
  );
};

export default TapPositionHandler;
