# Tic-Tac-Toe — React Native (Lab 6)

The official React tutorial [Tutorial: Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe),
rebuilt as a **React Native** app with **Expo** and **TypeScript**.

All the code is in [`src/app/index.tsx`](src/app/index.tsx).

## Run it

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go** (iPhone: use the Camera app). Your phone and computer must be on the same Wi‑Fi.

## Web → React Native translation

| Tutorial (web) | This project |
|---|---|
| `<div>` | `<View>` |
| `<button onClick>` | `<Pressable onPress>` |
| Text inside elements | Text inside `<Text>` |
| `className` + `styles.css` | `style={styles.x}` + `StyleSheet.create` |
| `board-row` | `<View>` with `flexDirection: "row"` |
| `<ol>` / `<li>` | `<ScrollView>` with one `<Pressable>` per move, **below** the board |
| JavaScript | TypeScript (`type SquareValue = "X" \| "O" \| null`, typed props) |

The tutorial's names are kept: `Square`, `Board`, `Game`, `onSquareClick`, `handleClick`,
`calculateWinner`, `history`, `currentMove`, `jumpTo`, `onPlay`, `xIsNext`.

## Checkpoints (commits)

1. `Board of nine squares`
2. `Playable game with a winner`
3. `Time travel` — `xIsNext` is computed from `currentMove`

## Improvements (one commit each)

1. The current move shows "You are at move #…" as text instead of a button.
2. The board is drawn with two loops instead of hardcoded squares.
3. A toggle button sorts the moves ascending or descending.
4. The three winning squares are highlighted, and a draw shows a message.
5. Each move shows its location as (row, col).
