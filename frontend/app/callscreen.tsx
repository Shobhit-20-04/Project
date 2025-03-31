import React, { useState, useEffect } from "react";
import { 
  View, Text, TouchableOpacity, Image, StyleSheet, Vibration 
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CallScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation();
  const phoneNumber = route?.params?.phoneNumber || "Unknown";

  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [isHeld, setIsHeld] = useState(false);

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

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={require("../assets/profile.png")} style={styles.profileImage} />
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        <Text style={styles.callStatus}>Ongoing Call • {formatDuration()}</Text>
      </View>

      {/* Call Control Buttons */}
      <View style={styles.controls}>
        {/* First Row */}
        <View style={styles.row}>
          <TouchableOpacity 
            style={[styles.controlButton, isMuted && styles.activeButton]} 
            onPress={() => setIsMuted(!isMuted)}
          >
            <Ionicons name={isMuted ? "mic-off" : "mic"} size={30} color="white" />
            <Text style={styles.buttonText}>Mute</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.controlButton, isSpeakerOn && styles.activeButton]} 
            onPress={() => setIsSpeakerOn(!isSpeakerOn)}
          >
            <MaterialIcons name={isSpeakerOn ? "volume-up" : "volume-off"} size={30} color="white" />
            <Text style={styles.buttonText}>Speaker</Text>
          </TouchableOpacity>

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
          <TouchableOpacity style={styles.controlButton}>
            <MaterialCommunityIcons name="message-text" size={30} color="white" />
            <Text style={styles.buttonText}>TTS</Text>
          </TouchableOpacity>

          {/* Centered End Call Button */}
          <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
            <MaterialIcons name="call-end" size={35} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton}>
            <MaterialCommunityIcons name="microphone" size={30} color="white" />
            <Text style={styles.buttonText}>STT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 50,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 22,
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
    alignItems: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 20,
  },
  controlButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    borderRadius: 50,
    width: 80,  // Adjusted width
    height: 80, // Adjusted height
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  buttonText: {
    color: "white",
    fontSize: 14, // Increased font size
    marginTop: 5,
    textAlign: "center",
    width: 80, // Ensures proper text wrapping
  },
  endCallButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 50,
    width: 80, // Adjusted to match other buttons
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CallScreen;
