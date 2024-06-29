import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import CheckBoxGreen from '../assets/CheckBoxGreen.svg'
import CheckBoxWhite from '../assets/CheckBoxWhite.svg'

const AnimatedButton2 = () => {
  const [buttonState, setButtonState] = useState('initial');
  const [buttonText, setButtonText] = useState('Press this button');
  const buttonColorAnim = useRef(new Animated.Value(0)).current;
  const iconPosition = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const indicatorOpacity = useRef(new Animated.Value(1)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  const buttonColor = buttonColorAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['rgb(0, 0, 0)', 'rgb(128, 128, 128)', 'transparent']
  });

  const handlePress = () => {
    setButtonState('loading');
    setButtonText('');

    Animated.timing(buttonColorAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setButtonState('icon');
      Animated.parallel([
        Animated.timing(indicatorOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(iconOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setButtonState('final');
        Animated.parallel([
          Animated.timing(iconPosition, {
            toValue: -10,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(buttonColorAnim, {
            toValue: 2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setButtonState('completed');
        });
      });
    }, 2000);
  };

  const renderButtonContent = () => {
    switch (buttonState) {
      case 'loading':
        return (
          <Animated.View style={{ opacity: indicatorOpacity }}>
            <ActivityIndicator color="white" />
          </Animated.View>
        );
      case 'icon':
      case 'final':
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Animated.View style={{ transform: [{ translateX: iconPosition }] }}>
                <CheckBoxWhite/>
            </Animated.View>
            <Animated.Text style={{ 
              marginLeft: 10, 
              color: 'green', 
              opacity: textOpacity,
              position: 'absolute',
              left: '50%'
            }}>
              Action completed
            </Animated.Text>
          </View>
        );
      case 'completed':
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBoxGreen/>
            <Text style={{ marginLeft: 10, color: 'green' }}>Action completed</Text>
          </View>
        );
      default:
        return <Text style={{ color: 'white' }}>{buttonText}</Text>;
    }
  };

  return (
    // <Animated.View style={{ opacity: buttonOpacity }}>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          backgroundColor: buttonColor,
          padding: 15,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          width: 200,
          overflow: 'hidden',
        }}
      >
        {renderButtonContent()}
      </TouchableOpacity>
    // </Animated.View>
  );
};

export default AnimatedButton2;
