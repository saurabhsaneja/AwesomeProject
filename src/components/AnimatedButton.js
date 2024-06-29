import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import CheckBoxGreen from '../assets/CheckBoxGreen.svg'
import CheckBoxWhite from '../assets/CheckBoxWhite.svg'

const AnimatedButton = () => {
  const [buttonState, setButtonState] = useState('initial');
  const [buttonText, setButtonText] = useState('Press this button');
  const buttonColorAnim = useRef(new Animated.Value(0)).current;
  const iconPosition = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const indicatorOpacity = useRef(new Animated.Value(1)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;

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
        ]).start();
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
          <Animated.View 
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              opacity: iconOpacity,
              transform: [{ translateX: iconPosition }]
            }}
          >
            {/* <Icon name={buttonState === 'icon' ? "check-circle" : "check"} size={24} color="white" /> */}
            {buttonState === 'icon' && <CheckBoxWhite/>}
            {buttonState === 'final' && (
              <View style={{flexDirection:'row', alignItems:'center'}} >
                <CheckBoxGreen/>
                <Text style={{ marginLeft: 10, color: 'green' }}>Action completed</Text>
              </View>
            )}
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
          overflow: 'hidden',
        }}
      >
        {renderButtonContent()}
      </TouchableOpacity>
    // </Animated.View>
  );
};

export default AnimatedButton;