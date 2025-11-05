import { Image } from 'expo-image';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import Header from '../../components/Header';
const iconChandoan = require("@/assets/image/chandoan.png")

export default function TabLayout() {

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        header: () => <Header />,
        swipeEnabled: true,
        drawerStyle: {
          backgroundColor: '#ffffff',
          width: 300,
        },
      }}
    >
      <Drawer.Screen
        name="checkFace"
        options={{
          title: 'Chẩn đoán bệnh',
          drawerIcon: () => (
            <Image source={iconChandoan} style={{ width: 35, height: 35 }} />
          ),
        }}
      />
    </Drawer>
  );
}
