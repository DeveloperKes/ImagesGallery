import { useImages } from "@/hooks/images/useImages";
import { Picture } from "@/interfaces/global";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { useHomePageStore } from "@/store/useHomePageStore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import CardImage from "./elements/CardImage";

export default function Gallery() {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [infiniteLoading, setInfiniteLoading] = useState<boolean>(false);
  const { getMorePictures } = useImages();
  const { gallery, clearGallery } = useHomePageStore();
  const { addToList } = useFavoriteStore();

  useEffect(() => {
    clearGallery();
    const get = async () => await getMorePictures();
    get();
  }, []);

  const handleRefresh = async () => {
    clearGallery();
    await getMorePictures();

    setRefreshing(false);
  };

  const handleInfiniteScroll = async () => {
    if (infiniteLoading) return;
    setInfiniteLoading(true);

    await getMorePictures();

    setInfiniteLoading(false);
  };

  const handleSetFavorite = (picture: Picture) => {
    addToList(picture);
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.gallery}
      data={gallery}
      numColumns={3}
      keyExtractor={(picture) => picture.id}
      columnWrapperStyle={styles.wrapper}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      onEndReached={handleInfiniteScroll}
      onEndReachedThreshold={0.3}
      renderItem={({ item, index }) => (
        <CardImage
          itemKey={`${item.id}-Picture${index}`}
          onDoubleTap={() => handleSetFavorite(item)}
          picture={item}
        />
      )}
      ListFooterComponent={
        infiniteLoading ? (
          <ActivityIndicator style={{ marginVertical: 20 }} />
        ) : null
      }
    />
  );
}

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
