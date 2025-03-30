import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Dialpad = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();

  const handlePress = (num: string) => {
    setPhoneNumber((prev) => prev + num);
  };

  const handleBackspace = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (phoneNumber.length > 0) {
      navigation.navigate("callscreen", { phoneNumber });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.phoneNumber}>{phoneNumber || "Enter Number"}</Text>
      <View style={styles.dialPad}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map(
          (num) => (
            <TouchableOpacity
              key={num}
              style={styles.dialButton}
              onPress={() => handlePress(num)}
            >
              <Text style={styles.dialText}>{num}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
      <View style={styles.actionRow}>
        <TouchableOpacity onPress={handleBackspace} style={styles.iconButton}>
          <Ionicons name="backspace" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCall} style={styles.callButton}>
          <Ionicons name="call" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    paddingBottom: 20,
  },
  phoneNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  dialPad: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "80%",
    justifyContent: "center",
  },
  dialButton: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    borderRadius: 40,
    backgroundColor: "#333",
  },
  dialText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
  },
  actionRow: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  iconButton: {
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 50,
    backgroundColor: "#444",
  },
  callButton: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: "green",
  },
});

export default Dialpad;
