import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import CheckBoxGreen from '../assets/CheckBoxGreen.svg'
import CheckBoxWhite from '../assets/CheckBoxWhite.svg'

const MyButton = () => {
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState(null);
  const [text, setText] = useState('Press this button');
  const [buttonBackground, setButtonBackground] = useState('#000');
  const [textColor, setTextColor] = useState('#fff');
  const animation = new Animated.Value(0);

  const handlePress = () => {
    setLoading(true);
    setButtonBackground('#ccc');
    setText(<ActivityIndicator color="#fff" />);
    setTimeout(() => {
      setIcon(<CheckBoxWhite/>);
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        animateIcon(); // Call animateIcon function here
      }, 2000);
    }, 2000);
  };

  const animateIcon = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setIcon(<CheckBoxGreen/>);
      setText('Action completed');
      setTextColor('#0f0');
    }, 500);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ backgroundColor: buttonBackground, padding: 16, borderRadius: 8 }}>
      {loading ? (
        <Animated.View style={{ opacity: animation, transform: [{ translateX: animation.interpolate({ inputRange: [0, 1], outputRange: [0, -24] }) }] }}>
          {icon}
        </Animated.View>
      ) : (
        <Text style={{ color: textColor, fontSize: 16 }}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default MyButton;