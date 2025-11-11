import { useFavoriteStore } from "@/store/useFavoriteStore";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import CardImage from "./elements/CardImage";

export const Saved = () => {
  const { savedList } = useFavoriteStore();
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.gallery}
      data={savedList}
      numColumns={3}
      keyExtractor={(picture) => picture.id}
      columnWrapperStyle={styles.wrapper}
      renderItem={({ item, index }) => (
        <CardImage
          itemKey={`${item.id}-Picture${index}`}
          picture={item}
          onDoubleTap={() => {}}
          unlikeTap={true}
        />
      )}
      ListEmptyComponent={
        <View>
          <Text>Esta vacios los favoritos</Text>
        </View>
      }
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    justifyContent: "space-between",
  },
  gallery: {
    gap: 8,
  },
});
