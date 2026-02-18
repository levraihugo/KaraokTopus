import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      {/* <iframe
        width={1000}
        src="//www.youtube.com/embed/tJjxKhjR9H4"
      ></iframe> */}

      <video width={1000} controls>
        <source src={"./Endless_Possibility.mp4"} type="video/mp4" />
        <source src={"./Endless_Possibility.ogg"} type="video/ogg" />
      </video>

      <audio controls>
        <source src={"./Endless_Possibility.ogg"} type="audio/ogg"></source>
        <source src={"./Endless_Possibility.mp3"} type="audio/mpeg"></source>
        // possible que le navigateur n'affiche pas
      </audio>
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

{
  /* <iframe width={420} height={315} src="https://www.youtube.com/watch?v=tJjxKhjR9H4"></iframe>; */
} // Vidéo à partir d'un lien youtube à intégrer

{
  /*
  <video width={420} height={315}>
  <source src={fileMP4} type="video/mp4"></source>
  <source src={fileOGG} type="video/ogg"></source>
  // possible que le navigateur n'affiche pas
</video>;*/
} // Vidéo à partir d'un fichier mp4

{
  /*
  <audio controls> // controls donne accès aux contrôles à l'utilisateur
  <source src={fileMP4} type="video/mp4"></source>
  <source src={fileOGG} type="video/ogg"></source>
  // possible que le navigateur n'affiche pas
</audio>;*/
} // Audio à partir d'un fichier mp4
