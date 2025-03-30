import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from "react-native";
import { Audio } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function CallScreen() {
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
  const router = useRouter();
  const [callTime, setCallTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Function to Play Tring Tring Sound
  const playRingtone = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/ringtone.mp3"),
        { shouldPlay: true, isLooping: true }
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing ringtone:", error);
    }
  };

  // Stop Ringtone when Call is Picked Up or Ended
  const stopRingtone = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  // Call Timer Effect & Start Ringtone
  useEffect(() => {
    playRingtone();
    const interval = setInterval(() => {
      setCallTime((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
      stopRingtone();
    };
  }, []);

  // Format Call Time (MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Button Press with Vibration Feedback
  const handlePress = (action: "mute" | "speaker" | "end") => {
    Vibration.vibrate(50);
    if (action === "mute") setIsMuted(!isMuted);
    if (action === "speaker") setIsSpeakerOn(!isSpeakerOn);
    if (action === "end") {
      stopRingtone();
      router.push("/dialpad");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.callingText}>Ongoing Call</Text>
      <Text style={styles.phoneNumber}>{phoneNumber || "Unknown Caller"}</Text>
      <Text style={styles.callTime}>{formatTime(callTime)}</Text>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, isMuted && styles.activeButton]}
          onPress={() => handlePress("mute")}
        >
          <Text style={styles.icon}>{isMuted ? "🔇" : "🎤"}</Text>
          <Text style={styles.label}>Mute</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, isSpeakerOn && styles.activeButton]}
          onPress={() => handlePress("speaker")}
        >
          <Text style={styles.icon}>🔊</Text>
          <Text style={styles.label}>Speaker</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.endCallButton} onPress={() => handlePress("end")}>
          <Text style={styles.endCallText}>📴</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles for a Modern Call UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  callingText: {
    fontSize: 18,
    color: "#888",
    marginBottom: 8,
  },
  phoneNumber: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  callTime: {
    fontSize: 22,
    color: "#bbb",
    marginBottom: 40,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  actionButton: {
    width: 90,
    height: 90,
    backgroundColor: "#222",
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    elevation: 5,
  },
  activeButton: {
    backgroundColor: "#444",
  },
  icon: {
    fontSize: 35,
    color: "#fff",
  },
  label: {
    fontSize: 16,
    color: "#bbb",
    marginTop: 5,
  },
  endCallButton: {
    width: 90,
    height: 90,
    backgroundColor: "red",
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    elevation: 5,
  },
  endCallText: {
    fontSize: 35,
    color: "#fff",
  },
});

