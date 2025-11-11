import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

import Header from "@/components/header/Header";
import { View } from "@/components/Themed";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

function TabBarIcon(
  props: Readonly<{
    name: React.ComponentProps<typeof Ionicons>["name"];
    color: string;
  }>
) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: useClientOnlyValue(false, true),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Descubre",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="globe-outline" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favoritos",
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="heart-outline" color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}
