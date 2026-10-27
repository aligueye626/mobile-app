# Tic-Tac-Toe — React Native (Lab 6 + Lab 10)

The official React tutorial [Tutorial: Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe),
rebuilt as a **React Native** app with **Expo Router**, **TypeScript**, a **navigation drawer**, and a **light / dark theme**.

---

## What the app does

| Feature | Detail |
|---|---|
| **Game** | Classic 3 × 3 Tic-Tac-Toe with full time-travel move history |
| **Time travel** | Tap any past move to jump back; current move shown as text |
| **Sort toggle** | Button reverses the move list between ascending and descending |
| **Winning highlight** | The three winning squares are highlighted in the theme's accent colour |
| **Draw detection** | "Draw! No one wins." when all squares are filled with no winner |
| **Drawer** | Swipe from the left edge or tap ☰ to open the navigation menu |
| **Screens** | Game · Settings · About — all three listed in the drawer |
| **Dark theme** | A switch in Settings turns dark mode on/off globally and instantly |
| **Theme context** | All colour tokens live in `src/context/ThemeContext.tsx` — only the theme string is stored as state |
| **About page** | Shows app name, version (read from `app.json`), and developer name |

---

## Run it

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go** (iPhone: use the Camera app). Your phone and computer must be on the same Wi-Fi.

---

## Project structure

```
src/
  app/
    _layout.tsx      ← Drawer layout + provider wiring
    index.tsx        ← Game screen (Lab 6 game, theme-aware)
    settings.tsx     ← Settings screen with dark-theme switch
    about.tsx        ← About screen reading version from app.json
  context/
    ThemeContext.tsx  ← Theme context, provider, and useTheme hook
```

> **Rule:** No colour literals inside `StyleSheet.create()` on any screen — all colours are fetched from `useTheme()` at render time.

---

## Web → React Native translation (Lab 6)

| Tutorial (web) | This project |
|---|---|
| `<div>` | `<View>` |
| `<button onClick>` | `<Pressable onPress>` |
| Text inside elements | Text inside `<Text>` |
| `className` + `styles.css` | `style={styles.x}` + `StyleSheet.create` |
| `board-row` | `<View>` with `flexDirection: "row"` |
| `<ol>` / `<li>` | `<ScrollView>` with one `<Pressable>` per move |
| JavaScript | TypeScript (`type SquareValue = "X" \| "O" \| null`, typed props) |

---

## Screenshots

### Light mode

![Game in light mode](./assets/screenshot-light.png)

### Dark mode

![Game in dark mode](./assets/screenshot-dark.png)
