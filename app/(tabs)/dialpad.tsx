import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import * as Speech from "expo-speech";

export default function DialpadScreen() {
  const [recognizedText, setRecognizedText] = useState("");

  // Function to start Speech-to-Text
  const startListening = () => {
    if (Platform.OS === "web") {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setRecognizedText(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.start();
    } else {
      alert("Speech recognition is not supported on this platform.");
    }
  };

  // Function to perform Text-to-Speech
  const speak = () => {
    if (recognizedText.trim() === "") {
      Speech.speak("Please say something first.");
    } else {
      Speech.speak(recognizedText);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={startListening}>
        <Text style={styles.buttonText}>🎤 Start Listening</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        Recognized: {recognizedText || "Waiting for input..."}
      </Text>

      <TouchableOpacity style={styles.button} onPress={speak}>
        <Text style={styles.buttonText}>🗣 Speak</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginVertical: 20,
    fontWeight: "bold",
  },
});
