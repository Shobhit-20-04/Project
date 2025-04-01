import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { launchImageLibrary } from 'react-native-image-picker';

// Define navigation types
type RootStackParamList = {
  Profile: undefined;
  Login: undefined;
};

export default function UpdateProfileScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [disability, setDisability] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const [isFocused, setIsFocused] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUsername(userData.username || '');
          setEmail(userData.email || '');
          setAge(userData.age || '');
          setGender(userData.gender || '');
          setDisability(userData.disability || '');
          setProfilePicture(userData.profilePicture || '');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUserData();
  }, []);

  const handleProfileUpdate = async () => {
    if (username.trim().length === 0) {
      Alert.alert('Error', 'Username cannot be empty!');
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem('user');
      let userData = storedUser ? JSON.parse(storedUser) : {};

      // Update user details
      userData.username = username;
      userData.email = email;
      userData.age = age;
      userData.gender = gender;
      userData.disability = disability;
      userData.profilePicture = profilePicture;

      await AsyncStorage.setItem('user', JSON.stringify(userData));

      Alert.alert('Success', 'Profile updated successfully!');
      navigation.navigate('Login'); // Go back to Profile Dashboard
    } catch (error) {
      console.error('Error updating user data:', error);
      Alert.alert('Error', 'Something went wrong while updating the profile.');
    }
  };

  const handleFocus = (inputName: string) => setIsFocused(inputName);
  const handleBlur = () => setIsFocused(null);

  // Image Picker Function
  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('Image Picker Error:', response.errorMessage);
      } else {
        // Check if response.assets is defined and then assign the URI to profilePicture
        if (response.assets && response.assets[0]?.uri) {
          setProfilePicture(response.assets[0].uri);
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Update Your Profile</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isFocused === 'username' && styles.focusedInput]}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            onFocus={() => handleFocus('username')}
            onBlur={handleBlur}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isFocused === 'email' && styles.focusedInput]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isFocused === 'age' && styles.focusedInput]}
            placeholder="Age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            onFocus={() => handleFocus('age')}
            onBlur={handleBlur}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isFocused === 'gender' && styles.focusedInput]}
            placeholder="Gender"
            value={gender}
            onChangeText={setGender}
            onFocus={() => handleFocus('gender')}
            onBlur={handleBlur}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isFocused === 'disability' && styles.focusedInput]}
            placeholder="Disability"
            value={disability}
            onChangeText={setDisability}
            onFocus={() => handleFocus('disability')}
            onBlur={handleBlur}
          />
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePick}>
            <Text style={styles.imagePickerButtonText}>
              {profilePicture ? 'Change Profile Picture' : 'Pick Profile Picture'}
            </Text>
          </TouchableOpacity>

          {profilePicture && (
            <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
          )}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleProfileUpdate}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  focusedInput: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e9',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: 'black',
  },
  imagePickerButton: {
    backgroundColor: '#ddd',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  imagePickerButtonText: {
    fontSize: 16,
    color: '#333',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 15,
  },
});
