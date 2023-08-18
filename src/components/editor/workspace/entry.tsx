import {ColorPalette} from '@src/themes/colors';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  gridBlockSize,
  gridBorderColor,
  gridBorderRadius,
  gridBorderWidth,
} from './grid.utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {commonIconSize} from '@src/components/common/helpers';
import {withOpacity} from '@src/tools/string-tools';
import {TouchableOpacity} from 'react-native';
import AnimatedBlock from '@src/components/common/animation/animated-block';
import {st} from '@src/themes/styles';
import {setAuxMode} from '@src/redux/slices/editor';

/**
 * @deprecated Currently this component is not used sine our language (Rabbit) follows ruby.
 *             The component's functionality is moved to @function FunctionItem ( Location : @src/components/editor/palette/function-item.tsx )
 */
const Entry: React.FC = () => {
  const dispatch = useDispatch();
  const onPress = () => {
    dispatch(setAuxMode('config'));
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <AnimatedBlock
        activateBorder={true}
        activateColor={false}
        activeColor={ColorPalette.transparent}
        inactiveColor={withOpacity(ColorPalette.teal, 0.5)}
        borderWidth={gridBorderWidth}
        style={[styles.root, st.center]}
        contentContainerStyle={[styles.contentContainer, st.center, st.fill]}>
        <Ionicons
          name="settings-sharp"
          size={commonIconSize}
          color={ColorPalette.dark}
        />
      </AnimatedBlock>
    </TouchableOpacity>
  );
};

export default Entry;

const styles = StyleSheet.create({
  root: {
    width: gridBlockSize,
    height: gridBlockSize,
    borderRadius: gridBorderRadius,
    borderWidth: gridBorderWidth,
    borderColor: gridBorderColor,
  },
  contentContainer: {
    borderRadius: gridBorderRadius,
  },
  text: {
    fontSize: 20,
    color: ColorPalette.gray,
  },
});
