import { Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Saved } from "@/components/gallery/Saved";
import ClearFavoritesModal from "@/components/modals/ClearFavoritesModal";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
export default function FavoritesScreen() {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { savedList } = useFavoriteStore();
  return (
    <View style={styles.container}>
      <View style={styles.subheader}>
        <Text style={styles.title}>Favoritos</Text>
        {savedList.length > 0 && (
          <Pressable onPress={() => setShowAlert(true)}>
            <Text>
              <Ionicons size={24} name="trash" />
            </Text>
          </Pressable>
        )}
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Saved />
      <ClearFavoritesModal isVisible={showAlert} setIsVisible={setShowAlert} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 16,
    height: 1,
    width: "90%",
  },
  subheader: {
    width: "90%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
