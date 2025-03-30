import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const DialPad = () => {
  const handlePress = (number: string) => {
    console.log(`Pressed ${number}`);
  };

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    backgroundColor: "#ddd",
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 24,
    color: "#000",
  },
});

export default DialPad;
