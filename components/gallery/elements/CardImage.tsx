import { Picture } from "@/interfaces/global";
import { useRef, useState } from "react";
import { Pressable } from "react-native";
import CachedImage from "./CachedImage";
import DoubleTapHeart from "./DoubleTapHeart";

interface CardImageProps {
  picture: Picture;
  onDoubleTap: VoidFunction;
  itemKey: string;
  unlikeTap?: boolean;
  variableWidth: number;
}

const CardImage = ({
  itemKey,
  picture,
  onDoubleTap = () => {},
  unlikeTap = false,
  variableWidth = 100 / 3,
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
  const onSingleTap = () => () => {};
  const handleDoubleTap = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
    onDoubleTap();
  };
  return (
    <Pressable
      onPress={handlePress}
      style={{
        width: `${variableWidth - 2}%`,
        position: "relative",
      }}
    >
      <CachedImage
        alt={`Imagen de ${picture.author}`}
        itemKey={itemKey}
        uri={picture.download_url}
      />
      <DoubleTapHeart
        itemKey={`${itemKey}-heart`}
        unlikeTap={unlikeTap}
        trigger={showHeart}
      />
    </Pressable>
  );
};

export default CardImage;
