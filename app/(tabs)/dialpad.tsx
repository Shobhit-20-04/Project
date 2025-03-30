import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Dialpad() {
  const [phoneNumber, setPhoneNumber] = useState(""); // Stores the entered phone number
  const router = useRouter();

  // Function to handle number input (limits to 10 digits)
  const handlePress = (digit: string) => {
    if (phoneNumber.length < 10) {
      setPhoneNumber((prev) => prev + digit);
    }
  };

  // Function to delete last digit
  const handleDelete = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  // Function to navigate to CallScreen
  const handleCall = () => {
    if (phoneNumber.length === 10) {
      router.push({ pathname: "/callscreen", params: { phoneNumber } });
    } else {
      alert("Please enter a 10-digit phone number.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Display entered phone number */}
      <TextInput style={styles.input} value={phoneNumber} editable={false} placeholder="Enter Number" />

      {/* Dial pad with proper structure */}
      <View style={styles.dialpad}>
        {[
          ["1", "2", "3"],
          ["4", "5", "6"],
          ["7", "8", "9"],
          ["*", "0", "#"],
        ].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((digit) => (
              <TouchableOpacity key={digit} style={styles.button} onPress={() => handlePress(digit)}>
                <Text style={styles.buttonText}>{digit}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Action buttons */}
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
}

// Styles for Normal Dialer Look
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F5F5F5" },

  input: {
    fontSize: 28,
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#333",
    width: 250,
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
  },

  dialpad: { alignItems: "center" },

  row: { flexDirection: "row" },

  button: {
    width: 80,
    height: 80,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },

  buttonText: { fontSize: 24, fontWeight: "bold", color: "#333" },

  actions: { flexDirection: "row", marginTop: 20, alignItems: "center" },

  callButton: {
    width: 80,
    height: 80,
    backgroundColor: "green",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },

  callText: { fontSize: 28, color: "#fff" },

  deleteButton: {
    width: 80,
    height: 80,
    backgroundColor: "red",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteText: { fontSize: 28, color: "#fff" },
});
