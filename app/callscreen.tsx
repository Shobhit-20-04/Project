import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Tts from "react-native-tts";
import Voice from "@react-native-voice/voice";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const CallScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const phoneNumber = route?.params?.phoneNumber || "Unknown"; // ✅ Handle undefined phoneNumber

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");

  useEffect(() => {
    // ✅ Check if Tts is available before calling
    Tts.getInitStatus()
      .then(() => {
        Tts.setDefaultLanguage("en-US");
        if (phoneNumber !== "Unknown") {
          Tts.speak(`Calling ${phoneNumber}`);
        } else {
          Tts.speak("Calling an unknown number");
        }
      })
      .catch((error) => console.log("TTS Error:", error));

    // ✅ Voice Recognition Listeners
    Voice.onSpeechStart = () => setIsSpeaking(true);
    Voice.onSpeechEnd = () => setIsSpeaking(false);
    Voice.onSpeechResults = (event) => {
      setRecognizedText(event.value[0]);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [phoneNumber]);

  const startListening = async () => {
    try {
      await Voice.start("en-US");
    } catch (error) {
      console.log("Voice Recognition Error:", error);
    }
  };

  const stopCall = () => {
    Tts.stop();
    Voice.stop();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.callingText}>Calling {phoneNumber}</Text>

      <TouchableOpacity onPress={startListening} style={styles.micButton}>
        <Ionicons name="mic" size={30} color="white" />
      </TouchableOpacity>

      <Text style={styles.recognizedText}>
        {recognizedText ? `You said: ${recognizedText}` : "Listening..."}
      </Text>

      <TouchableOpacity onPress={stopCall} style={styles.endCallButton}>
        <Ionicons name="call" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  callingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  micButton: {
    padding: 20,
    borderRadius: 50,
    backgroundColor: "#444",
    marginBottom: 20,
  },
  recognizedText: {
    fontSize: 18,
    color: "white",
    marginBottom: 20,
  },
  endCallButton: {
    padding: 20,
    borderRadius: 50,
    backgroundColor: "red",
  },
});

export default CallScreen;
