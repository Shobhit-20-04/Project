import { View, Text, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import Web3 from 'web3';

export default function LoginScreen() {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      if ((window as any).ethereum) {
        const web3 = new Web3((window as any).ethereum);
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } else {
        alert('MetaMask not installed!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Web3 Login</Text>
      {account ? (
        <Text style={styles.account}>Connected: {account}</Text>
      ) : (
        <Button title="Connect Wallet" onPress={connectWallet} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  account: { marginTop: 20, fontSize: 16, color: 'green' },
});
