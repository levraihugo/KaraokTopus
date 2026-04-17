import { StyleSheet, Text, View } from "react-native";
import ChansonPage from "./ChansonPage";
import * as SQLite from "expo-sqlite";
import Accueil from "./Accueil";
import { BrowserRouter } from "react-router";
import { createDbIfNeeded } from "../services/chansonService";
// import { Route } from "react-router";

export default function App() {
  return (
    <View style={styles.container}>
      <SQLite.SQLiteProvider
        databaseName="data.db"
        // directory="../assets"
        onInit={createDbIfNeeded}
        // assetSource={{ assetId: require("../assets/data.db") }}
      >
        {/* <Accueil /> */}
        <ChansonPage />
      </SQLite.SQLiteProvider>
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
