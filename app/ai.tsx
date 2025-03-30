import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function AIScreen() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const getAIResponse = async () => {
    try {
      const res = await fetch('http://your-django-server.com/api/ai/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error(error);
      setResponse('Error getting response.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Assistant</Text>
      <TextInput style={styles.input} placeholder="Ask something..." value={input} onChangeText={setInput} />
      <Button title="Ask AI" onPress={getAIResponse} />
      {response && <Text style={styles.response}>{response}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  input: { width: '80%', borderWidth: 1, padding: 10, marginVertical: 10 },
  response: { marginTop: 20, fontSize: 16 },
});
