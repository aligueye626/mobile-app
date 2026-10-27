import { Switch, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function SettingsScreen() {
  const { theme, colors, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.row,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.labelGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Dark Theme</Text>
          <Text style={[styles.sublabel, { color: colors.textSecondary }]}>
            {isDark ? "Dark mode is on" : "Light mode is on"}
          </Text>
        </View>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: "#ccc", true: "#90caf9" }}
          thumbColor={isDark ? "#1565c0" : "#f5f5f5"}
          accessibilityLabel="Toggle dark theme"
        />
      </View>

      <Text style={[styles.hint, { color: colors.textSecondary }]}>
        The theme applies to all screens instantly.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  labelGroup: {
    flex: 1,
    marginRight: 16,
  },
  label: {
    fontSize: 17,
    fontWeight: "600",
  },
  sublabel: {
    fontSize: 13,
    marginTop: 2,
  },
  hint: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 8,
  },
});
