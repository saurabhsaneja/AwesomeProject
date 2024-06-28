/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
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
    setTimeout(() => {
      setIsButtonPressed(true)
      setTimeout(() => {
        setIsApiSuccessful(true)
      }, 1000);
    }, 1000);
  }
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ backgroundColor: 'white', flex: 1 }}>
        <TouchableOpacity onPress={onPress} style={styles.button} >
          {isApiSuccessful ? <AnimatedSvgIcons /> :
            isButtonPressed ? <ActivityIndicator color='black' size='small' /> : <Text style={styles.text}>Press this button</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: { borderWidth: 1, borderColor: 'black', height: 100, alignItems: 'center', justifyContent: 'center' },
  text: { color: 'black', fontSize: 20 }
});

export default App;
