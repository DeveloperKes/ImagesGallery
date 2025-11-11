import { Picture } from "@/interfaces/global";
import { useRef, useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import DoubleTapHeart from "./DoubleTapHeart";

interface CardImageProps {
  picture: Picture;
  onDoubleTap: VoidFunction;
  itemKey: string;
  unlikeTap?: boolean;
}

const CardImage = ({
  itemKey,
  picture,
  onDoubleTap = () => {},
  unlikeTap = false,
}: CardImageProps) => {
  const [showHeart, setShowHeart] = useState<boolean>(false);
  const lastTap = useRef<number | null>(null);
  const handlePress = () => {
    const now = Date.now();

    if (lastTap.current && now - lastTap.current < 300) {
      handleDoubleTap();
      lastTap.current = null;
    } else {
      lastTap.current = now;
      setTimeout(() => {
        if (lastTap.current && Date.now() - lastTap.current >= 300) {
          onSingleTap();
          lastTap.current = null;
        }
      }, 300);
    }
  };
  const onSingleTap = () => alert("Single tap");
  const handleDoubleTap = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
    onDoubleTap();
  };
  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <Image
        key={itemKey}
        source={{ uri: picture.download_url }}
        style={styles.image}
        alt={`Imagen de ${picture.author}`}
        resizeMode="cover"
      />
      <DoubleTapHeart
        key={`${itemKey}-heart`}
        unlikeTap={unlikeTap}
        trigger={showHeart}
      />
    </Pressable>
  );
};

export default CardImage;

const styles = StyleSheet.create({
  container: {
    width: "32%",
    position: "relative",
  },
  image: { width: "100%", aspectRatio: 9 / 16, borderRadius: 8 },
});
