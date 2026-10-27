import { createContext, useContext, useState, ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Theme = "light" | "dark";

export type ThemeColors = {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  square: string;
  squareWin: string;
  moveButton: string;
  moveButtonBorder: string;
  sortButton: string;
  sortButtonText: string;
  drawerBackground: string;
  drawerActiveBackground: string;
  drawerText: string;
  drawerActiveText: string;
  headerBackground: string;
  headerText: string;
  statusBarStyle: "dark-content" | "light-content";
  playerX: string;
  playerO: string;
};

// ─── Colour palettes ─────────────────────────────────────────────────────────

const LIGHT: ThemeColors = {
  background: "#f5f5f5",
  surface: "#ffffff",
  text: "#1a1a1a",
  textSecondary: "#555555",
  border: "#cccccc",
  square: "#ffffff",
  squareWin: "#ffe066",
  moveButton: "#ffffff",
  moveButtonBorder: "#aaaaaa",
  sortButton: "#333333",
  sortButtonText: "#ffffff",
  drawerBackground: "#ffffff",
  drawerActiveBackground: "#e8f4fd",
  drawerText: "#333333",
  drawerActiveText: "#1565c0",
  headerBackground: "#1565c0",
  headerText: "#ffffff",
  statusBarStyle: "light-content",
  playerX: "#1565c0",
  playerO: "#c62828",
};

const DARK: ThemeColors = {
  background: "#121212",
  surface: "#1e1e1e",
  text: "#e8e8e8",
  textSecondary: "#aaaaaa",
  border: "#3a3a3a",
  square: "#2a2a2a",
  squareWin: "#7c5800",
  moveButton: "#2a2a2a",
  moveButtonBorder: "#555555",
  sortButton: "#e8e8e8",
  sortButtonText: "#121212",
  drawerBackground: "#1e1e1e",
  drawerActiveBackground: "#1a3a5c",
  drawerText: "#cccccc",
  drawerActiveText: "#90caf9",
  headerBackground: "#1a1a2e",
  headerText: "#e8e8e8",
  statusBarStyle: "light-content",
  playerX: "#90caf9",
  playerO: "#ef9a9a",
};

// ─── Context ──────────────────────────────────────────────────────────────────

type ThemeContextValue = {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const colors = theme === "dark" ? DARK : LIGHT;

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (ctx === null) {
    throw new Error(
      "useTheme must be used inside a <ThemeProvider>. " +
        "Make sure your component tree is wrapped with ThemeProvider."
    );
  }
  return ctx;
}
