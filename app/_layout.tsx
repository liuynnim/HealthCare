import { useEffect } from "react";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import LoadingScreen from "@/components/Loading";

const queryClient = new QueryClient();

function MainStack() {
  const router = useRouter();
  const { isLoggedIn, isGuest, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (isLoggedIn || isGuest) router.replace("/(tabs)/checkFace");
    else router.replace("/(screen)/login");
  }, [isLoading, isLoggedIn, isGuest]);

  if (isLoading) return <LoadingScreen />;

  return (
    <Stack>
      <Stack.Screen
        name="(screen)/login/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(screen)/register/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(screen)/checkFace/index"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Roboto-Condensed-Regular": require("../assets/fonts/Roboto_Condensed-Regular.ttf"),
    "Roboto-Condensed-Bold": require("../assets/fonts/Roboto_Condensed-Bold.ttf"),
    "Roboto-Condensed-Medium": require("../assets/fonts/Roboto_Condensed-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AuthProvider>
          <MainStack />
          <StatusBar style="auto" />
        </AuthProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
