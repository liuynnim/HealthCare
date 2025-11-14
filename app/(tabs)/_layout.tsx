import { Colors } from "@/styles/Common";
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
          height: 70,
          paddingBottom: 12,
        },
      }}
    >
      <Tabs.Screen
        name="checkFace"
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
    </Tabs>
  );
}
