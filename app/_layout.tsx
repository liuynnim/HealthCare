import LoadingScreen from "@/components/Loading";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { setupNotificationChannel } from "@/hook/notificationChannel";
import { toastConfig } from "@/utils/toastConfig";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { setVisibilityAsync } from "expo-navigation-bar";
import { SplashScreen, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as Notifications from "expo-notifications";

const queryClient = new QueryClient();

const RootNavigator = () => {
  const { isLoggedIn, isLoading } = useAuth();
  useEffect(() => {
    if (isLoading) return;
    if (isLoggedIn) router.replace("/(tabs)/ImageDiagnosis");
    else router.replace("/(screen)/login");
  }, [isLoading, isLoggedIn]);

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
      <Stack.Screen
        name="(screen)/register/VerifyCodeScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(screen)/ImageDiagnosis/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(screen)/countStep/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(screen)/medicationReminder/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(screen)/medicationReminder/components/MedicationAddScreen/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(screen)/profile/index"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Roboto-Condensed-Regular": require("../assets/fonts/Roboto_Condensed-Regular.ttf"),
    "Roboto-Condensed-Bold": require("../assets/fonts/Roboto_Condensed-Bold.ttf"),
    "Roboto-Condensed-Medium": require("../assets/fonts/Roboto_Condensed-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
    (async () => {
      await setVisibilityAsync("hidden");
    })();
  }, [fontsLoaded]);
  //set noti hiển thị khi app đang mở
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  //set notification channel
  useEffect(() => {
    setupNotificationChannel();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AuthProvider>
          <ActionSheetProvider>
            <RootNavigator />
          </ActionSheetProvider>
          <StatusBar style="light" />
          <Toast config={toastConfig} />
        </AuthProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
