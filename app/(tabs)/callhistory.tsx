import { View, Text, FlatList, StyleSheet } from 'react-native';

const callLogs = [
  { id: '1', number: '123-456-7890', time: '10:30 AM' },
  { id: '2', number: '987-654-3210', time: '1:15 PM' },
];

export default function CallHistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Call History</Text>
      <FlatList
        data={callLogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.log}>
            <Text>{item.number}</Text>
            <Text>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  log: { padding: 10, borderBottomWidth: 1 },
});
