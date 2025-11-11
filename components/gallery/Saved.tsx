import { Picture } from "@/interfaces/global";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import React from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import CardImage from "./elements/CardImage";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SPACING = 8;

export const Saved = () => {
  const { savedList, removeToList } = useFavoriteStore();
  let numColumns;
  if (savedList.length === 1) {
    numColumns = 1;
  } else if (savedList.length === 2) {
    numColumns = 2;
  } else {
    numColumns = 3;
  }

  const handleUnlike = (picture: Picture) => {
    setTimeout(() => {
      removeToList(picture);
    }, 1300);
  };

  return (
    <FlatList
      key={numColumns}
      style={styles.container}
      contentContainerStyle={{
        gap: SPACING,
      }}
      data={savedList}
      numColumns={numColumns}
      keyExtractor={(picture) => picture.id}
      columnWrapperStyle={numColumns > 1 ? styles.wrapper : undefined}
      renderItem={({ item, index }) => (
        <CardImage
          itemKey={`${item.id}-Picture${index}`}
          picture={item}
          onDoubleTap={() => handleUnlike(item)}
          unlikeTap={true}
          variableWidth={100 / numColumns}
        />
      )}
      ListEmptyComponent={
        <View style={styles.no_elements}>
          <Text style={styles.texts_alert}>
            Todo gran comienzo empieza vacío
          </Text>
          <Text style={styles.texts_alert}>
            Encuentra lo que te gusta y guárdalo en tus favoritos.
          </Text>
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

  no_elements: {
    width: "100%",
    backgroundColor: "#fefefe",
    borderRadius: 8,
    margin: "auto",
    marginTop: 16,
    padding: 16,
    gap: 16,
  },
  texts_alert: {
    color: "#1a1a1a",
    textAlign: "center",
    fontWeight: "bold",
  },
});
