import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Vibration, ScrollView } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CallScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation();
  const phoneNumber = route?.params?.phoneNumber || "Unknown";


  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [isHeld, setIsHeld] = useState(false);
  const [isDialpadVisible, setIsDialpadVisible] = useState(false); // Track dialpad visibility

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = () => {
    const minutes = Math.floor(callDuration / 60);
    const seconds = callDuration % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleEndCall = () => {
    Vibration.vibrate(100);
    navigation.goBack();
  };

  const toggleDialpad = () => {
    setIsDialpadVisible(!isDialpadVisible); // Toggle dialpad visibility
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={require("../assets/profile.png")} style={styles.profileImage} />
          <Text style={styles.phoneNumber}>{phoneNumber}</Text>
          <Text style={styles.callStatus}>Ongoing Call • {formatDuration()}</Text>
        </View>

        {/* Call Control Buttons */}
        <View style={styles.controls}>
          <View style={styles.row}>
            {/* Mute Button */}
            <TouchableOpacity
              style={[styles.controlButton, isMuted && styles.activeButton]}
              onPress={() => setIsMuted(!isMuted)}
            >
              <Ionicons name={isMuted ? "mic-off" : "mic"} size={30} color="white" />
              <Text style={styles.buttonText}>Mute</Text>
            </TouchableOpacity>

            {/* Speaker Button */}
            <TouchableOpacity
              style={[styles.controlButton, isSpeakerOn && styles.activeButton]}
              onPress={() => setIsSpeakerOn(!isSpeakerOn)}
            >
              <MaterialIcons name={isSpeakerOn ? "volume-up" : "volume-off"} size={30} color="white" />
              <Text style={styles.buttonText}>Speaker</Text>
            </TouchableOpacity>

            {/* Hold Button */}
            <TouchableOpacity
              style={[styles.controlButton, isHeld && styles.activeButton]}
              onPress={() => setIsHeld(!isHeld)}
            >
              <FontAwesome name={isHeld ? "pause" : "play"} size={30} color="white" />
              <Text style={styles.buttonText}>Hold</Text>
            </TouchableOpacity>
          </View>

          {/* Second Row */}
          <View style={styles.row}>
            {/* Text to Speech Button */}
            <TouchableOpacity style={styles.controlButton}>
              <MaterialCommunityIcons name="message-text" size={30} color="white" />
              <Text style={styles.buttonText}>TTS</Text>
            </TouchableOpacity>

            {/* Centered End Call Button */}
            <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
              <MaterialIcons name="call-end" size={35} color="white" />
            </TouchableOpacity>

            {/* Speech to Text Button */}
            <TouchableOpacity style={styles.controlButton}>
              <MaterialCommunityIcons name="microphone" size={30} color="white" />
              <Text style={styles.buttonText}>STT</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Toggle Dialpad Visibility Button */}
        <TouchableOpacity style={styles.toggleDialpadButton} onPress={toggleDialpad}>
          <Text style={styles.toggleDialpadText}>
            {isDialpadVisible ? "Hide Dialpad" : "Show Dialpad"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Dial Pad Section - Visible only when toggled */}
      {isDialpadVisible && (
        <View style={styles.dialpadOverlay}>
          <View style={styles.dialpadContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={toggleDialpad}>
              <Ionicons name="close-circle" size={40} color="white" />
            </TouchableOpacity>

            {/* Dial pad rows */}
            {[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["*", "0", "#"]].map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((digit) => (
                  <TouchableOpacity key={digit} style={styles.dialpadButton}>
                    <Text style={styles.dialpadText}>{digit}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "flex-start", // Align elements towards the top
    paddingTop: 40,
  },
  scrollContent: {
    flexGrow: 1, // Ensure scrollview takes up the full available space
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100, // Added padding bottom to prevent scroll to dialpad
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
  },
  callStatus: {
    fontSize: 16,
    color: "#aaa",
    marginTop: 5,
  },
  controls: {
    width: "90%",
    marginTop: 20,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 20,
  },
  controlButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 20,
    borderRadius: 50,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  activeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  endCallButton: {
    backgroundColor: "red",
    padding: 20,
    borderRadius: 50,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  dialpadOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
    zIndex: 10, // Ensure it's above other content
    justifyContent: "center",
    alignItems: "center",
  },
  dialpadContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.85)", // Dark background for dialpad
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "80%", // Center the dialpad
    maxWidth: 350,
    paddingTop: 40, // Added padding to ensure space between close button and dialpad buttons
  },
  closeButton: {
    position: "absolute",
    top: 7,
    right: 7,
    zIndex: 2,
    opacity: 0.5,
  },
  dialpadButton: {
    width: 60,
    height: 60,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  dialpadText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  toggleDialpadButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 10,
    borderRadius: 50,
    marginTop: 20,
  },
  toggleDialpadText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CallScreen;
