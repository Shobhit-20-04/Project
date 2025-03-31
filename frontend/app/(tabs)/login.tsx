import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Web3 from 'web3';

export default function LoginScreen() {
  const [account, setAccount] = useState<string | null>(null);
  const [isSignup, setIsSignup] = useState(false);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const connectWallet = async () => {
    try {
      if ((window as any).ethereum) {
        const web3 = new Web3((window as any).ethereum);
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } else {
        alert('MetaMask not installed!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.[A-Za-z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSendOtp = () => {
    if (mobile.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert('Weak Password', 'Password must be at least 8 characters long and include at least one digit and one special character.');
      return;
    }
    setOtpSent(true);
    Alert.alert('OTP Sent', 'Check your SMS for the OTP');
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) { // Assuming OTP is 6 digits
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }
    setIsVerified(true);
    Alert.alert('Success', 'You have signed up successfully! OTP verification done. Please login now.');
    try {
      await AsyncStorage.setItem('user', JSON.stringify({ mobile, password }));
    } catch (error) {
      console.error('Error storing user data', error);
    }
    setIsSignup(false);
    setOtpSent(false);
    setOtp('');
  };

  const handleLogin = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const { mobile: storedMobile, password: storedPassword } = JSON.parse(storedUser);
        if (mobile === storedMobile && password === storedPassword) {
          Alert.alert('Congratulations', 'Successfully logged in!');
        } else {
          Alert.alert('Error', 'Invalid mobile number or password');
        }
      } else {
        Alert.alert('Error', 'No user found, please sign up first');
      }
    } catch (error) {
      console.error('Error retrieving user data', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number"
            keyboardType="numeric"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />
          
          {isSignup ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Create Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              {!otpSent && <Button title="Send OTP" onPress={handleSendOtp} />}
              {otpSent && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter OTP"
                    keyboardType="numeric"
                    value={otp}
                    onChangeText={setOtp}
                  />
                  <Button title="Verify OTP" onPress={handleVerifyOtp} />
                </>
              )}
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Button title="Login" onPress={handleLogin} />
            </>
          )}
        </View>

        <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
          <Text style={styles.switchText}>
            {isSignup ? "Already have an account? Login" : "New user? Sign up"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.web3Container}>
        <Text style={styles.web3Title}>Web3 Login</Text>
        {account ? (
          <Text style={styles.account}>Connected: {account}</Text>
        ) : (
          <Button title="Connect Wallet" onPress={connectWallet} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  formContainer: { alignItems: 'center', width: '100%', maxWidth: 400 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  account: { marginTop: 20, fontSize: 16, color: 'green' },
  form: { width: '100%' },
  input: { width: '100%', padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  switchText: { color: 'blue', marginTop: 10 },
  web3Container: { marginTop: 30, alignItems: 'center' },
  web3Title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});
