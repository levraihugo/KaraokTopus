import { StyleSheet, Text, View, Button } from "react-native";
import { Host, SearchBar } from "@expo/ui/jetpack-compose";
import { createDbIfNeeded } from "../services/chansonService";
import { SQLiteProvider } from "expo-sqlite";
// import { useNavigation } from "react-router";

export default function Accueil() {
  // const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <SQLiteProvider
        databaseName="data.db"
        // directory="../assets"
        onInit={createDbIfNeeded}
        // assetSource={{ assetId: require("../assets/data.db") }}
      >
        <Host matchContents>
          <SearchBar>
            {/* onSearch={(searchText) => setQuery(searchText)} */}
            <SearchBar.Placeholder>Search items...</SearchBar.Placeholder>
          </SearchBar>
        </Host>
        <Button onPress={() => navigation.navigate("")} />
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
