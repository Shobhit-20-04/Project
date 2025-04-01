import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="login" options={{ title: "Login" }} />
      <Tabs.Screen name="dialpad" options={{ title: "Dialpad" }} />
      <Tabs.Screen name="callhistory" options={{ title: "Call History" }} />
      <Tabs.Screen name="ai" options={{ title: "AI Assistant" }} />
      <Tabs.Screen name="Profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
