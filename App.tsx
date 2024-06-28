/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AnimatedSvgIcons from './src/AnimatedSvgIcons';

function App() {
  const [isButtonPressed, setIsButtonPressed] = useState(false)
  const [isApiSuccessful, setIsApiSuccessful] = useState(false)
  const onPress = () => {
    const timer1 = setTimeout(() => {
      setIsButtonPressed(true)
    }, 1000);
    const timer2 = setTimeout(() => {
      setIsApiSuccessful(true)
    }, 2000);
    // Cleanup timers if component unmounts or trigger changes
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }
  useEffect(() => {
    console.log('isApiSuccessful changed', isApiSuccessful);
  }, [isApiSuccessful])
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ backgroundColor: 'white', flex: 1 }}>
        <TouchableOpacity onPress={onPress} style={[styles.button, isButtonPressed ? { backgroundColor: 'yellow' } : null]} >
          {isApiSuccessful ? <AnimatedSvgIcons /> :
            isButtonPressed ? <ActivityIndicator color='black' size='small' /> : <Text style={styles.text}>Press this button</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'black',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'black',
    fontSize: 20
  },
});

export default App;
