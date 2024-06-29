import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import CheckBoxGreen from './src/assets/CheckBoxGreen.svg';
import CheckBoxWhite from './src/assets/CheckBoxWhite.svg';
import MyButton from './src/components/MyButton';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showWhiteIcon, setShowWhiteIcon] = useState(false);
  const animatedValue = useSharedValue(0);
  const opacityValue = useSharedValue(0.5); // For text opacity
  const bgOpacityValue = useSharedValue(1); // For background opacity

  const handleAnimationEnd = () => {
    setCompleted(true);
    opacityValue.value = withTiming(1, {
      duration: 500,
      easing: Easing.linear,
    });
    bgOpacityValue.value = withTiming(0, {
      duration: 500,
      easing: Easing.linear,
    });
  };

  useEffect(() => {
    if (showWhiteIcon) {
      animatedValue.value = withTiming(1, {
        duration: 500,
        easing: Easing.linear,
      }, () => {
        runOnJS(handleAnimationEnd)();
      });
    }
  }, [showWhiteIcon]);

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowWhiteIcon(true);
    }, 2000);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animatedValue.value * -50 }],
    };
  });

  const textOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityValue.value,
    };
  });

  const buttonBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `rgba(0, 0, 0, ${bgOpacityValue.value})`,
    };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={[styles.button, loading || showWhiteIcon ? { backgroundColor: 'grey' } : null, completed ? { backgroundColor: 'transparent', borderWidth: 0 } : null]}>
        {!loading && !showWhiteIcon && !completed && (
          <Text style={styles.buttonText}>Press this button</Text>
        )}
        {loading && (
          <ActivityIndicator size="small" color="#FFFFFF" />
        )}
        {showWhiteIcon && (
          <Animated.View style={[animatedStyle]}>
            <CheckBoxWhite />
          </Animated.View>
        )}
        {!loading && completed && (
          // <View style={styles.completedContainer}>
            <Animated.View style={[styles.completedContainer, textOpacityStyle]}>
              <CheckBoxGreen />
              <Text style={styles.completedText}>Task Completed</Text>
            </Animated.View>
          // </View>
        )}
      </TouchableOpacity>
      {/* <Animated.View style={[StyleSheet.absoluteFill, buttonBackgroundStyle]} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  button: {
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'black',
    height: 50,
    width: '50%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    color: 'green',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default App;
