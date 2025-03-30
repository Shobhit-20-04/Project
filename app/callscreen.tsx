import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';

export default function CallScreen() {
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const router = useRouter();

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.5);
    Tts.addEventListener('tts-finish', () => setIsSpeaking(false));

    Voice.onSpeechResults = (event) => {
      setSpokenText(event.value?.[0] || '');
    };

    return () => {
      Tts.removeEventListener('tts-finish');
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startSpeaking = () => {
    setIsSpeaking(true);
    Tts.speak('Hello, how can I assist you?');
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error(error);
    }
  };

  const endCall = () => {
    Tts.stop();
    Voice.stop();
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.callingText}>Calling {phoneNumber}...</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#007bff' }]}
          onPress={startSpeaking}
        >
          <Text style={styles.buttonText}>🔊 Speak</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#ff5722' }]}
          onPress={startListening}
        >
          <Text style={styles.buttonText}>🎤 Listen</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.spokenText}>{spokenText}</Text>
      <TouchableOpacity style={styles.endCallButton} onPress={endCall}>
        <Text style={styles.endCallText}>❌ End Call</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },});
