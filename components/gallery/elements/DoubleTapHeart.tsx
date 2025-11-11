import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";

interface DoubleTapHeartProps {
  trigger: boolean;
  key: string;
  unlikeTap?: boolean;
}

const DoubleTapHeart = ({
  trigger,
  key,
  unlikeTap = true,
}: DoubleTapHeartProps) => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (trigger) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1,
            duration: 200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(800),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 0,
            duration: 400,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [trigger]);

  return (
    <Animated.View
      key={key}
      style={[
        styles.heartContainer,
        {
          opacity,
          transform: [{ scale }],
        },
      ]}
    >
      <Ionicons
        name={unlikeTap ? "heart-dislike" : "heart"}
        size={50}
        color={unlikeTap ? "#fefefe" : "#af3737ff"}
      />
    </Animated.View>
  );
};

export default DoubleTapHeart;

const styles = StyleSheet.create({
  heartContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
