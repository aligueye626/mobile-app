import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

// Inner layout that can access the theme context
function DrawerLayout() {
  const { colors } = useTheme();

  return (
    <>
      <StatusBar style={colors.statusBarStyle} />
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: colors.headerBackground },
          headerTintColor: colors.headerText,
          headerTitleStyle: { fontWeight: "bold" },
          drawerStyle: { backgroundColor: colors.drawerBackground },
          drawerActiveTintColor: colors.drawerActiveText,
          drawerInactiveTintColor: colors.drawerText,
          drawerActiveBackgroundColor: colors.drawerActiveBackground,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Game",
            title: "Tic-Tac-Toe",
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            title: "Settings",
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: "About",
            title: "About",
          }}
        />
      </Drawer>
    </>
  );
}

// Root layout wraps everything in providers
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <ThemeProvider>
        <DrawerLayout />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
