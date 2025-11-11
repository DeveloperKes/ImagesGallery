import * as FileSystem from "expo-file-system/legacy";
import { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
interface CachedImageProps {
  uri: string;
  itemKey: string;
  alt: string;
}

const CachedImage = ({ uri, itemKey, alt }: CachedImageProps) => {
  const [localUri, setLocalUri] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const filename = uri.split("/").pop();
        const fileUri = `${FileSystem.cacheDirectory}${filename}`;
        const info = await FileSystem.getInfoAsync(fileUri);

        if (info.exists) {
          // ✅ ya está en caché
          setLocalUri(fileUri);
        } else {
          // 🔄 descargar y guardar
          const downloaded = await FileSystem.downloadAsync(uri, fileUri);
          setLocalUri(downloaded.uri);
        }
      } catch (error) {
        console.warn("Error en caché de imagen:", error);
        setLocalUri(uri); // fallback
      }
    };

    load();
  }, [uri]);
  return (
    <Image
      key={itemKey}
      source={{ uri: localUri || uri }}
      style={styles.image}
      alt={alt}
      resizeMode="cover"
    />
  );
};

export default CachedImage;

const styles = StyleSheet.create({
  image: { width: "100%", aspectRatio: 9 / 16, borderRadius: 8 },
});
