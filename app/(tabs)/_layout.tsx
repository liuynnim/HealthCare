import React from 'react';
import { Drawer } from 'expo-router/drawer';
import Header from '../../components/Header';
import { Image } from 'expo-image';
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
        name="explore"
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
