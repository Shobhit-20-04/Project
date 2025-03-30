import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Tts from "react-native-tts";

const CallScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Check if TTS is initialized before using it
    Tts.getInitStatus()
      .then(() => {
        Tts.setDefaultLanguage("en-US");
        Tts.setDucking(true);
      })
      .catch((error) => {
        console.error("TTS Error:", error);
        Alert.alert("TTS Error", "Text-to-Speech is not available.");
      });

    return () => {
      Tts.stop();
    };
  }, []);

  const startTTS = () => {
    Tts.speak("Calling...");
  };

  const endCall = () => {
    Tts.speak("Call ended");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.callingText}>Calling...</Text>
      <TouchableOpacity style={styles.endCallButton} onPress={endCall}>
        <Text style={styles.endCallText}>End Call</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
  },
  callingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  endCallButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 50,
  },
  endCallText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CallScreen;
