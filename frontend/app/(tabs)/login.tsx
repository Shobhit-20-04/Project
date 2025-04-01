import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Web3 from "web3";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Define navigation types
type RootStackParamList = {
  Login: undefined;
  Profile: undefined;
  SignUp: undefined;
};

export default function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isSignup, setIsSignup] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<{
    username: string;
    email: string;
  } | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Web3 Wallet Connection
  const connectWallet = async () => {
    try {
      if ((window as any).ethereum) {
        const web3 = new Web3((window as any).ethereum);
        await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } else {
        alert("MetaMask not installed!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Validate password strength
  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle OTP send
  const handleSendOtp = () => {
    if (mobile.length !== 10) {
      Alert.alert("Error", "Please enter a valid 10-digit mobile number");
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 8 characters long and include at least one digit and one special character."
      );
      return;
    }
    setOtpSent(true);
    Alert.alert("OTP Sent", "Check your SMS for the OTP");
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit OTP");
      return;
    }

    // Assuming OTP verification passed
    setIsVerified(true);
    Alert.alert("Success", "OTP verified successfully!");
    try {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          mobile,
          password,
          username: "User",
          email: "user@example.com",
        })
      );
    } catch (error) {
      console.error("Error storing user data", error);
    }
    setIsSignup(false);
    setOtpSent(false);
    setOtp("");
    Alert.alert("Success", "You are now signed up! Please log in.");
  };

  // Handle login
  const handleLogin = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (mobile === userData.mobile && password === userData.password) {
          setProfile({ username: userData.username, email: userData.email });
          setIsLoggedIn(true);
          Alert.alert("Congratulations", "Successfully logged in!");
        } else {
          Alert.alert("Error", "Invalid mobile number or password");
        }
      } else {
        Alert.alert("Error", "No user found, please sign up first");
      }
    } catch (error) {
      console.error("Error retrieving user data", error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    setIsLoggedIn(false);
    setProfile(null);
    setMobile("");
    setPassword("");
    Alert.alert("Logged Out", "You have been logged out successfully.");
  };

  return (
    <View style={styles.container}>
      {isLoggedIn && profile ? (
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Hello {profile.username}</Text>
          <Text style={styles.welcomeText}>
            Welcome to the app! You can start using the features now.
          </Text>
          <Button title="Logout" onPress={handleLogout} />
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={styles.updateProfileButton}
          >
            <Text style={styles.updateProfileText}>Update Your Profile</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Enter Mobile Number"
              keyboardType="numeric"
              maxLength={10}
              value={mobile}
              onChangeText={setMobile}
            />
            {isSignup ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Create Password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                {!otpSent && (
                  <Button title="Send OTP" onPress={handleSendOtp} />
                )}
                {otpSent && (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter OTP"
                      keyboardType="numeric"
                      value={otp}
                      onChangeText={setOtp}
                    />
                    <Button title="Verify OTP" onPress={handleVerifyOtp} />
                  </>
                )}
              </>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                <Button title="Login" onPress={handleLogin} />
              </>
            )}
          </View>
          <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
            <Text style={styles.switchText}>
              {isSignup
                ? "Already have an account? Login"
                : "New user? Sign up"}
            </Text>
          </TouchableOpacity>
          <View style={styles.web3Container}>
            <Text style={styles.web3Title}>Web3 Login</Text>
            {account ? (
              <Text style={styles.account}>Connected: {account}</Text>
            ) : (
              <Button title="Connect Wallet" onPress={connectWallet} />
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  formContainer: { alignItems: "center", width: "100%", maxWidth: 400 },
  profileContainer: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    width: "90%",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  welcomeText: { fontSize: 18, marginTop: 6, color: "#777", marginBottom:10 },
  account: { marginTop: 20, fontSize: 16, color: "green" },
  form: { width: "100%" },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  switchText: { color: "blue", marginTop: 10 },
  web3Container: { marginTop: 30, alignItems: "center" },
  web3Title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  updateProfileButton: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  updateProfileText: { color: "#fff", fontSize: 16 },
});
