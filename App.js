import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import VideoYouTube from "./VideoYouTube";
import Paroles from "./Paroles";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <VideoYouTube width={300} lien="tJjxKhjR9H4" />
      <Paroles />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
