import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

// ✅ Define the route types
type RootStackParamList = {
  callscreen: { phoneNumber: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, "callscreen">;

const Dialpad = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation<NavigationProp>(); // ✅ Fix: Correctly type navigation

  const handlePress = (num: string) => {
    setPhoneNumber((prev) => prev + num);
  };

  const handleDelete = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (phoneNumber.length > 0) {
      navigation.navigate("callscreen", { phoneNumber }); // ✅ Fix: TypeScript now recognizes this
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.numberDisplay}>{phoneNumber || "Enter Number"}</Text>
      <View style={styles.dialpad}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map(
          (num) => (
            <TouchableOpacity
              key={num}
              style={styles.button}
              onPress={() => handlePress(num)}
            >
              <Text style={styles.buttonText}>{num}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Text style={styles.callText}>📞</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>⌫</Text>
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
    backgroundColor: "#fff",
  },
  numberDisplay: { fontSize: 30, marginBottom: 20, fontWeight: "bold" },
  dialpad: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  button: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: "#ddd",
    borderRadius: 40,
  },
  buttonText: { fontSize: 24, fontWeight: "bold" },
  actions: { flexDirection: "row", marginTop: 20 },
  callButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  callText: { fontSize: 24, color: "white" },
  deleteButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  deleteText: { fontSize: 24, color: "white" },
});

export default Dialpad;
