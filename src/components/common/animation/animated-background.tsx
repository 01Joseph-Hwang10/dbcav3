import {hexagonPartAnimationDuration} from '@src/components/config-drone/constants';
import {StyleMixin} from '@src/utils/types';
import React from 'react';
import {Animated, Easing} from 'react-native';

interface PAnimatedBackground extends StyleMixin {
  activate: boolean;
  inactiveColor: string;
  activeColor: string;
  duration?: number;
}

interface SAnimatedBackground {
  animation: Animated.Value;
}

/**
 * @description This component uses react-native Animated API
 *              which is not compatible with react-native-reanimated API
 */
class AnimatedBackground extends React.Component<
  PAnimatedBackground,
  SAnimatedBackground
> {
  state: SAnimatedBackground = {
    animation: new Animated.Value(0),
  };

  animate = () => {
    const {activate, duration} = this.props;
    Animated.timing(this.state.animation, {
      toValue: activate ? 1 : 0,
      duration: duration ?? hexagonPartAnimationDuration,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  };

  interpolate = () => {
    const {inactiveColor, activeColor} = this.props;
    return this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [inactiveColor, activeColor],
    });
  };

  componentDidUpdate = ({activate: prevActivate}: PAnimatedBackground) => {
    const {activate} = this.props;
    if (prevActivate !== activate) {
      this.animate();
    }
  };

  render() {
    const animatedStyle = {
      backgroundColor: this.interpolate(),
    };
    const {style, children} = this.props;
    return (
      <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
    );
  }
}

export default AnimatedBackground;
