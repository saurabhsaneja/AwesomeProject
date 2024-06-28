// AnimatedSvgIcons.js
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import CheckBoxGreen from './assets/CheckBoxGreen.svg'
import CheckBoxWhite from './assets/CheckBoxWhite.svg'
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const AnimatedSvgIcons = ({ }) => {
  const offset = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    offset.value = withTiming(-100, { duration: 1000, easing: Easing.inOut(Easing.ease) });
    opacity.value = withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) }, () => {
      offset.value = 0;
      opacity.value = 1;
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <AnimatedSvg width={100} height={100} style={[styles.icon, animatedStyle]}>
        <CheckBoxGreen />
      </AnimatedSvg>
      <AnimatedSvg width={100} height={100} style={[styles.icon, { opacity: 1 - opacity.value }]}>
        <CheckBoxWhite />
      </AnimatedSvg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
  },
});

export default AnimatedSvgIcons;
