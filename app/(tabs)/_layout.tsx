import { Colors } from "@/styles/Common";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
const iconChandoan = require("@/assets/image/chandoan.png");
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.card,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 20,
        },
      }}
    >
      <Tabs.Screen
        name="ImageDiagnosis"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={iconChandoan}
              style={{
                marginTop: 20,
                width: 60,
                height: 60,
                tintColor: focused ? "#0ea5e9" : "#94a3b8",
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="CountStep"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="walk-outline"
              size={40}
              color={focused ? Colors.primary_2 : Colors.text_secondary}
              style={{ height: 40, width: 40, marginTop: 16 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="medicationReminder"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="pill"
              size={40}
              color={focused ? Colors.primary_2 : Colors.text_secondary}
              style={{ height: 40, width: 40, marginTop: 16 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-circle-outline"
              size={40}
              color={focused ? Colors.primary_2 : Colors.text_secondary}
              style={{ height: 40, width: 40, marginTop: 16 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
