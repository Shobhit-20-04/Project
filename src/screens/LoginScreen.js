import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import Web3 from "web3";
import axios from "axios";

const LoginScreen = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [token, setToken] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      setWalletAddress(accounts[0]);

      // Sign message
      const message = "Login with Web3";
      const signature = await web3.eth.personal.sign(message, accounts[0]);

      // Send to backend for verification
      const response = await axios.post(
        "http://127.0.0.1:8000/api/web3-login/",
        {
          address: accounts[0],
          signature,
        }
      );

      setToken(response.data.access);
    } else {
      alert("Please install Metamask");
    }
  };

  return (
    <View>
      <Text>Web3 Login</Text>
      {walletAddress ? (
        <Text>Connected: {walletAddress}</Text>
      ) : (
        <Button title="Connect Wallet" onPress={connectWallet} />
      )}
    </View>
  );
};

export default LoginScreen;
