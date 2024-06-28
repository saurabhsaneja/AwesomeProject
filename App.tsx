import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import CheckBoxGreen from './src/assets/CheckBoxGreen.svg'
import CheckBoxWhite from './src/assets/CheckBoxWhite.svg'

const App = () => {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showWhiteIcon, setShowWhiteIcon] = useState(false);
  const animatedValue = useSharedValue(0);

  const handleAnimationEnd = () => {
    setCompleted(true);
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
      transform: [{ translateX: animatedValue.value * -50 }], // Adjust this value for the desired translation
    };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        {!loading && !showWhiteIcon && !completed && (
          <Text style={styles.buttonText}>Press this button</Text>
        )}
        {loading && (
          <ActivityIndicator size="small" color="#FFFFFF" />
        )}
        {showWhiteIcon && !completed && (
          <Animated.View style={[animatedStyle]}>
            <CheckBoxWhite/>
          </Animated.View>
        )}
        {!loading && completed && (
          <View style={styles.completedContainer}>
            <CheckBoxGreen/>
            <Text style={styles.completedText}>Task Completed</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    // padding: 15,
    height: 50,
    width:'50%',
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
