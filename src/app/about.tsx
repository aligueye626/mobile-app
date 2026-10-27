import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { useTheme } from "../context/ThemeContext";

export default function AboutScreen() {
  const { colors } = useTheme();

  // Read version from app.json via expo-constants
  const version: string = Constants.expoConfig?.version ?? "—";
  const appName: string = Constants.expoConfig?.name ?? "Tic-Tac-Toe";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* App icon placeholder */}
      <View style={[styles.iconBox, { backgroundColor: colors.headerBackground }]}>
        <Text style={styles.iconText}>⭕</Text>
      </View>

      <Text style={[styles.appName, { color: colors.text }]}>{appName}</Text>
      <Text style={[styles.version, { color: colors.textSecondary }]}>
        Version {version}
      </Text>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Row label="Developer" value="Aly" colors={colors} />
        <Row label="Course" value="Mobile Dev" colors={colors} />
        <Row label="Lab" value="Lab 10 — Drawer & Dark Theme" colors={colors} />
      </View>

      <Text style={[styles.footer, { color: colors.textSecondary }]}>
        A classic Tic-Tac-Toe game with time-travel move history,
        a navigation drawer, and a full light / dark theme.
      </Text>
    </View>
  );
}

// ─── Small helper ─────────────────────────────────────────────────────────────

type Colors = ReturnType<typeof useTheme>["colors"];

function Row({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: Colors;
}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, { color: colors.textSecondary }]}>
        {label}
      </Text>
      <Text style={[styles.rowValue, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

// ─── Layout styles (no colours) ───────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    paddingTop: 40,
  },
  iconBox: {
    width: 90,
    height: 90,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  iconText: {
    fontSize: 50,
  },
  appName: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  version: {
    fontSize: 15,
    marginTop: 4,
  },
  divider: {
    height: 1,
    width: "80%",
    marginVertical: 24,
  },
  card: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  rowValue: {
    fontSize: 14,
    fontWeight: "600",
    flexShrink: 1,
    textAlign: "right",
    marginLeft: 12,
  },
  footer: {
    marginTop: 28,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 12,
  },
});
