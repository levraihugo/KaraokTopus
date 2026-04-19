import { StyleSheet, View } from "react-native";
import ChansonPage from "./pages/ChansonPage";
import * as SQLite from "expo-sqlite";
import { createDbIfNeeded } from "./services/BDDService";

export default function App() {
  return (
    <View style={styles.container}>
      <SQLite.SQLiteProvider databaseName="data.db" onInit={createDbIfNeeded}>
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
