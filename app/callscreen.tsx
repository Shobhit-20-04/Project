import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Tts from 'react-native-tts';

const CallScreen = ({ route, navigation }: any) => {
  const { phoneNumber } = route.params || {};
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    Tts.getInitStatus()
      .then(() => {
        Tts.setDefaultLanguage('en-US');
        Tts.speak(`Calling ${phoneNumber}`);
        setIsSpeaking(true);
      })
      .catch((err) => console.error('TTS Error:', err));
  }, []);

  const handleEndCall = () => {
    Tts.stop();
    setIsSpeaking(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.callingText}>Calling {phoneNumber}...</Text>
      <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
        <Text style={styles.endCallText}>End Call</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  callingText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  endCallButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
  },
  endCallText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CallScreen;
