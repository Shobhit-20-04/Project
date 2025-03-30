import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DialPad = ({ navigation }: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePress = (num: string) => {
    setPhoneNumber((prev) => prev + num);
  };

  const handleDelete = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  const handleCall = () => {
    navigation.navigate('CallScreen', { phoneNumber });
  };

  const renderButton = (num: string) => (
    <TouchableOpacity style={styles.button} onPress={() => handlePress(num)}>
      <Text style={styles.buttonText}>{num}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      <View style={styles.row}>
        {renderButton('1')}
        {renderButton('2')}
        {renderButton('3')}
      </View>
      <View style={styles.row}>
        {renderButton('4')}
        {renderButton('5')}
        {renderButton('6')}
      </View>
      <View style={styles.row}>
        {renderButton('7')}
        {renderButton('8')}
        {renderButton('9')}
      </View>
      <View style={styles.row}>
        {renderButton('*')}
        {renderButton('0')}
        {renderButton('#')}
      </View>
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Text style={styles.callButtonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>⌫</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  phoneNumber: {
    fontSize: 28,
    marginBottom: 20,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  callButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 50,
    marginRight: 20,
  },
  callButtonText: {
    color: 'white',
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default DialPad;
