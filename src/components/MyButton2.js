import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import CheckBoxGreen from '../assets/CheckBoxGreen.svg'
import CheckBoxWhite from '../assets/CheckBoxWhite.svg'

const AnimatedButton = () => {
  const [buttonState, setButtonState] = useState('initial');
  const [buttonText, setButtonText] = useState('Press this button');
  const [buttonColor, setButtonColor] = useState('black');
  const iconPosition = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    setButtonState('loading');
    setButtonColor('grey');
    setButtonText('');

    setTimeout(() => {
      setButtonState('icon');
      
      setTimeout(() => {
        setButtonState('final');
        setButtonColor('transparent');
        Animated.parallel([
          Animated.timing(iconPosition, {
            toValue: -22,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(buttonOpacity, {
            toValue: 0.5,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      }, 500);
    }, 2000);
  };

  const renderButtonContent = () => {
    switch (buttonState) {
      case 'loading':
        return <ActivityIndicator color="white" />;
      case 'icon':
        return <CheckBoxWhite/>;
      case 'final':
        return (
          <Animated.View style={{ flexDirection: 'row', alignItems: 'center', transform: [{ translateX: iconPosition }] }}>
            <CheckBoxGreen/>
            <Text style={{ marginLeft: 10, color: 'green' }}>Action completed</Text>
          </Animated.View>
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
        }}
      >
        {renderButtonContent()}
      </TouchableOpacity>
    // </Animated.View>
  );
};

export default AnimatedButton;