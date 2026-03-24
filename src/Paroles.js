import { Text, View } from "react-native";

export default function Paroles(props) {
  return (
    <View style={{ margin: "20" }}>
      <Text
        style={{
          color: "black",
          fontSize: "15",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {/* Texte chanté en ce moment */}
        {props.texte1}
      </Text>
      <Text
        style={{
          color: "gray",
          fontSize: "13",
          textAlign: "center",
        }}
      >
        {/* Prochain texte */}
        {props.texte2}
      </Text>
    </View>
  );
}

// {props.present}
// {props.futur}
