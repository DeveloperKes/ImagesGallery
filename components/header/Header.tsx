import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../Themed";

function HeaderIcon(
  props: Readonly<{
    name: React.ComponentProps<typeof Ionicons>["name"];
    color: string;
  }>
) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>iMagic</Text>
      <HeaderIcon name="heart" color="#fefefe" />
      <HeaderIcon name="log-out-outline" color="#fefefe" />
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingTop: 50,
    backgroundColor: "#0D0D0D",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
