import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Tts from 'react-native-tts';

const CallScreen = () => {
  useEffect(() => {
    Tts.getInitStatus()
      .then(() => {
        Tts.setDefaultLanguage('en-US');
        Tts.speak('Calling...');
      })
      .catch((err) => {
        console.log('TTS Error:', err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.callingText}>Calling...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  callingText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default CallScreen;
