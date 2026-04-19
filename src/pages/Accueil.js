import { StyleSheet, View } from "react-native";
import { Host, SearchBar } from "@expo/ui/jetpack-compose";
import { createDbIfNeeded } from "../services/BDDService";
import { SQLiteProvider } from "expo-sqlite";

export default function Accueil() {
  return (
    <View style={styles.container}>
      <SQLiteProvider databaseName="data.db" onInit={createDbIfNeeded}>
        <Host matchContents>
          <SearchBar>
            <SearchBar.Placeholder>Search items...</SearchBar.Placeholder>
          </SearchBar>
        </Host>
      </SQLiteProvider>
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
