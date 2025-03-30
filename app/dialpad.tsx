import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function DialpadScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handlePress = (digit: string) => {
    setPhoneNumber((prev) => prev + digit);
  };

  const handleBackspace = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (phoneNumber.length > 0) {
      router.push({
        pathname: '/callscreen',
        params: { phoneNumber },
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.phoneNumber}
        value={phoneNumber}
        editable={false}
        placeholder="Enter Number"
        placeholderTextColor="#999"
      />
      <View style={styles.dialpad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
          <TouchableOpacity key={digit} style={styles.button} onPress={() => handlePress(digit)}>
            <Text style={styles.buttonText}>{digit}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Text style={styles.callText}>📞</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backspaceButton} onPress={handleBackspace}>
          <Text style={styles.backspaceText}>⌫</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Define your styles here
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  phoneNumber: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  dialpad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#ddd',
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 24,
    color: '#333',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 20,
  },
  callButton: {
    marginRight: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  callText: {
    fontSize: 18,
    color: '#fff',
  },
  backspaceButton: {
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
  },
  backspaceText: {
    fontSize: 18,
    color: '#fff',
  },
});
