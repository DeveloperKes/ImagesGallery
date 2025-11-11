import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import Gallery from "@/components/gallery/Gallery";

export default function TabOneScreen() {


  return (
    <View style={styles.container}>
      <Text>Descubre lo nuevo en el mundo</Text>
      <Text>(Presiona dos veces para guardar)</Text>
      <Gallery />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 16,
    rowGap: 16,
    overflowY: "auto"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
