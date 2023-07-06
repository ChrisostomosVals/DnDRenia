import React, { FC, useEffect } from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withRepeat,
} from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../../theme/theme';

const Spinner:FC<{size: number}> = ({size}) => {
  const spinAnim = useSharedValue(0);

  const rotate = () => {
    spinAnim.value = withRepeat(
      withTiming(2, {
        duration: 4000,
        easing: Easing.linear,
      }),
      -1,
    );
  };

  useEffect(() => {
    rotate();
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${spinAnim.value * 360}deg` }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <FontAwesome5 name="dice-d20" size={size} color={theme.color.primary.purple} />
    </Animated.View>
  );
};

export default Spinner;
