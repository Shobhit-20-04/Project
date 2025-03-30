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
  // Styles as previously provided
});
