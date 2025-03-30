import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DialpadScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePress = (value: string) => {
    setPhoneNumber((prev) => prev + value);
  };

  const handleBackspace = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (phoneNumber.length > 0) {
      navigation.navigate('CallScreen', { phoneNumber });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.phoneNumber}>{phoneNumber || 'Enter Number'}</Text>

      <View style={styles.keypad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((item) => (
          <TouchableOpacity key={item} style={styles.key} onPress={() => handlePress(item)}>
            <Text style={styles.keyText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.backspace} onPress={handleBackspace}>
          <Text style={styles.keyText}>⌫</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Text style={styles.callText}>📞</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' },
  phoneNumber: { fontSize: 24, color: '#fff', marginBottom: 20 },
  keypad: { flexDirection: 'row', flexWrap: 'wrap', width: 240, justifyContent: 'center' },
  key: { width: 80, height: 80, justifyContent: 'center', alignItems: 'center', margin: 5, backgroundColor: '#444', borderRadius: 40 },
  keyText: { fontSize: 24, color: '#fff' },
  controls: { flexDirection: 'row', marginTop: 20 },
  backspace: { marginRight: 20, backgroundColor: '#555', padding: 15, borderRadius: 30 },
  callButton: { backgroundColor: '#0f0', padding: 15, borderRadius: 30 },
  callText: { fontSize: 24, color: '#fff' }
});
