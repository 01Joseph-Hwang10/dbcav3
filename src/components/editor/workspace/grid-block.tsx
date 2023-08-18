import AnimatedBlock from '@src/components/common/animation/animated-block';
import JoystickHandler from '@src/components/common/gesture-handler/joystick-handler';
import {
  AugmentButtonCtxProvider,
  IAugmentButtonContext,
} from '@src/context/augment-button';
import {SwitchContext, SwitchCtxProvider} from '@src/context/switch';
import {
  useAuxMode,
  useFocusedBlockIdx,
  useFocusedFunc,
} from '@src/hooks/redux-queries';
import {setAuxMode} from '@src/redux/slices/editor';
import {setFocusedBlockIdx} from '@src/redux/slices/workspace';
import {ColorPalette} from '@src/themes/colors';
import {st} from '@src/themes/styles';
import {Nullable} from '@src/utils/types';
import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Directions,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {batch, useDispatch, useSelector} from 'react-redux';
import AugmentButtons from './augment-buttons';
import GridInnerBlock from './grid-inner';
import {
  getBlockColor,
  gridBlockSize,
  gridBorderColor,
  gridBorderRadius,
  gridBorderWidth,
} from './grid.utils';

interface PGridBlockGestureHandler {
  onLongPressIn: () => void;
  onPressIn: () => void;
  onChangeDirection: (direction?: Directions) => void;
  onPressOut: () => void;
  onPan: (event: PanGestureHandlerGestureEvent) => void;
}

const GridBlockGestureHandler: React.FC<PGridBlockGestureHandler> = ({
  children,
  onPan,
  onPressIn,
  onChangeDirection,
  onLongPressIn,
  onPressOut,
}) => {
  const workspaceMode = useSelector(
    (state: RootState) => state.workspace.workspaceMode,
  );
  return (
    <>
      {workspaceMode === 'edit' ? (
        <JoystickHandler
          delay={400}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onChangeDirection={onChangeDirection}
          onLongPressIn={onLongPressIn}
          style={styles.joystickHitbox}>
          {children}
        </JoystickHandler>
      ) : (
        <PanGestureHandler onGestureEvent={onPan}>{children}</PanGestureHandler>
      )}
    </>
  );
};

interface PGridBlock {
  order: number;
}

const GridBlock: React.FC<PGridBlock> = ({order}) => {
  const [currentDirection, setCurrentDirection] =
    useState<Nullable<Directions>>(null);
  const [onTouch, setOnHover] = useState(false);
  const [focused, setFocused] = useContext(SwitchContext);

  const augmentButtonCtx: IAugmentButtonContext = {
    direction: currentDirection,
    setDirection: setCurrentDirection,
  };

  const dispatch = useDispatch();
  const focusedFunc = useFocusedFunc();
  const focusedBlockIdx = useFocusedBlockIdx();
  const auxMode = useAuxMode();

  const blocks = focusedFunc?.blocks ?? [];
  const blockIdx = order - 1;
  const block = blocks[blockIdx];
  const blockFocused = blockIdx === focusedBlockIdx;

  const onPressIn = () => {
    batch(() => {
      dispatch(setFocusedBlockIdx(blockIdx));
      dispatch(setAuxMode(block?.name ?? 'none'));
    });
  };
  const onLongPressIn = () => {
    setFocused(true);
    setOnHover(true);
  };
  const onChangeDirection = (direction?: Nullable<Directions>) => {
    setCurrentDirection(direction);
  };
  const onPressOut = () => {
    setOnHover(false);
    setFocused(false);
    if (!focusedFunc) return;
    if (currentDirection === Directions.UP && auxMode !== 'if') {
      focusedFunc.insertBlockByBlockName('if', blockIdx); // Alt: ForBlock
      dispatch(setAuxMode('if'));
    }
    if (currentDirection === Directions.RIGHT && auxMode !== 'function') {
      focusedFunc.insertBlockByBlockName('function', blockIdx);
      dispatch(setAuxMode('function'));
    }
    if (currentDirection === Directions.DOWN && auxMode !== 'assign') {
      focusedFunc.insertBlockByBlockName('assign', blockIdx);
      dispatch(setAuxMode('assign'));
    }
    if (currentDirection === Directions.LEFT && auxMode !== 'motor') {
      focusedFunc.insertBlockByBlockName('motor', blockIdx); // Alt: WaitBlock
      dispatch(setAuxMode('motor'));
    }
    onChangeDirection(null);
  };

  const onPan = (event: PanGestureHandlerGestureEvent) => {
    console.log(event);
  };

  return (
    <SwitchCtxProvider value={[onTouch, setOnHover]}>
      <AugmentButtonCtxProvider value={augmentButtonCtx}>
        <GridBlockGestureHandler
          onPressIn={onPressIn}
          onLongPressIn={onLongPressIn}
          onChangeDirection={onChangeDirection}
          onPressOut={onPressOut}
          onPan={onPan}>
          <AnimatedBlock
            activateBorder={!(onTouch && focused)}
            activateColor={onTouch}
            activeColor={getBlockColor(block) ?? ColorPalette.teal}
            inactiveColor={getBlockColor(block) ?? ColorPalette.transparent}
            style={[
              styles.root,
              st.center,
              st.border.color(
                blockFocused ? ColorPalette.gold : gridBorderColor,
              ),
            ]}
            contentContainerStyle={[
              styles.contentContainer,
              st.center,
              st.fill,
            ]}
            borderWidth={gridBorderWidth}>
            <GridInnerBlock order={order} block={block} />
            <AugmentButtons />
          </AnimatedBlock>
        </GridBlockGestureHandler>
      </AugmentButtonCtxProvider>
    </SwitchCtxProvider>
  );
};

export default GridBlock;

const styles = StyleSheet.create({
  root: {
    width: gridBlockSize,
    height: gridBlockSize,
    borderRadius: gridBorderRadius,
    borderColor: gridBorderColor,
    borderWidth: gridBorderWidth,
  },
  contentContainer: {
    borderRadius: gridBorderRadius,
  },
  joystickHitbox: {
    width: gridBlockSize,
    height: gridBlockSize,
  },
});
