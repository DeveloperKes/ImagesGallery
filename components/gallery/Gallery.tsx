import { useImages } from "@/hooks/images/useImages";
import { useHomePageStore } from "@/store/useHomePageStore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";

export default function Gallery() {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [infiniteLoading, setInfiniteLoading] = useState<boolean>(false);
  const { getMorePictures } = useImages();
  const { gallery, clearGallery } = useHomePageStore();
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
      renderItem={({ item }) => (
        <Image
          key={item.id}
          source={{ uri: item.download_url }}
          style={{ width: "32%", aspectRatio: 9 / 16, borderRadius: 8 }}
          alt={`Imagen de ${item.author}`}
          resizeMode="cover"
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
