import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import axios from "axios";

const AIScreen = () => {
  const [input, setInput] = useState("");
  const [prediction, setPrediction] = useState(null);

  const getPrediction = async () => {
    const response = await axios.post("http://127.0.0.1:8000/api/ai-predict/", {
      input,
    });
    setPrediction(response.data.prediction);
  };

  return (
    <View>
      <Text>AI Model Prediction</Text>
      <TextInput placeholder="Enter value" onChangeText={setInput} />
      <Button title="Predict" onPress={getPrediction} />
      {prediction && <Text>Prediction: {prediction}</Text>}
    </View>
  );
};

export default AIScreen;
