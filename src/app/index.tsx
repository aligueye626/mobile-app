import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

// ─── Types ────────────────────────────────────────────────────────────────────

type SquareValue = "X" | "O" | null;

type SquareProps = {
  value: SquareValue;
  onSquareClick: () => void;
  highlight: boolean;
};

// ─── Square ───────────────────────────────────────────────────────────────────

function Square({ value, onSquareClick, highlight }: SquareProps) {
  const { colors } = useTheme();

  const textColor =
    value === "X"
      ? colors.playerX
      : value === "O"
      ? colors.playerO
      : colors.text;

  return (
    <Pressable
      style={[
        styles.square,
        {
          backgroundColor: highlight ? colors.squareWin : colors.square,
          borderColor: colors.border,
        },
      ]}
      onPress={onSquareClick}
    >
      <Text style={[styles.squareText, { color: textColor }]}>{value}</Text>
    </Pressable>
  );
}

// ─── Board ────────────────────────────────────────────────────────────────────

type BoardProps = {
  xIsNext: boolean;
  squares: SquareValue[];
  onPlay: (nextSquares: SquareValue[]) => void;
};

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  const { colors } = useTheme();

  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const winningLine = calculateWinningLine(squares);

  let status: string;
  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.every((s) => s !== null)) {
    status = "Draw! No one wins.";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const rows = [0, 1, 2].map((row) => (
    <View key={row} style={styles.boardRow}>
      {[0, 1, 2].map((col) => {
        const i = row * 3 + col;
        return (
          <Square
            key={i}
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
            highlight={winningLine !== null && winningLine.includes(i)}
          />
        );
      })}
    </View>
  ));

  return (
    <>
      <Text style={[styles.status, { color: colors.text }]}>{status}</Text>
      {rows}
    </>
  );
}

// ─── Game (default export = screen) ──────────────────────────────────────────

export default function Game() {
  const { colors } = useTheme();

  const [history, setHistory] = useState<SquareValue[][]>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: SquareValue[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let location = "";
    if (move > 0) {
      const i = squares.findIndex(
        (sq, idx) => sq !== history[move - 1][idx]
      );
      location =
        " (" + (Math.floor(i / 3) + 1) + ", " + ((i % 3) + 1) + ")";
    }

    if (move === currentMove) {
      return (
        <Text
          key={move}
          style={[styles.currentMove, { color: colors.text }]}
        >
          {"You are at move #" + move + location}
        </Text>
      );
    }

    const description =
      move > 0 ? "Go to move #" + move + location : "Go to game start";

    return (
      <Pressable
        key={move}
        style={[
          styles.moveButton,
          {
            backgroundColor: colors.moveButton,
            borderColor: colors.moveButtonBorder,
          },
        ]}
        onPress={() => jumpTo(move)}
      >
        <Text style={[styles.moveText, { color: colors.text }]}>
          {description}
        </Text>
      </Pressable>
    );
  });

  if (!isAscending) moves.reverse();

  return (
    <View style={[styles.game, { backgroundColor: colors.background }]}>
      <View style={styles.gameBoard}>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </View>

      <Pressable
        style={[styles.sortButton, { backgroundColor: colors.sortButton }]}
        onPress={() => setIsAscending(!isAscending)}
      >
        <Text style={[styles.sortText, { color: colors.sortButtonText }]}>
          {isAscending ? "Sort: ascending ↑" : "Sort: descending ↓"}
        </Text>
      </Pressable>

      <ScrollView
        style={styles.gameInfo}
        contentContainerStyle={styles.gameInfoContent}
      >
        {moves}
      </ScrollView>
    </View>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calculateWinner(squares: SquareValue[]): SquareValue {
  const line = calculateWinningLine(squares);
  return line ? squares[line[0]] : null;
}

function calculateWinningLine(squares: SquareValue[]): number[] | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}

// ─── Layout styles (no colours) ───────────────────────────────────────────────

const styles = StyleSheet.create({
  game: {
    flex: 1,
    alignItems: "center",
    paddingTop: 32,
  },
  gameBoard: {
    alignItems: "center",
  },
  gameInfo: {
    marginTop: 20,
    alignSelf: "stretch",
  },
  gameInfoContent: {
    alignItems: "center",
    paddingBottom: 40,
  },
  status: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  boardRow: {
    flexDirection: "row",
  },
  square: {
    width: 90,
    height: 90,
    borderWidth: 2,
    marginTop: -2,
    marginRight: -2,
    alignItems: "center",
    justifyContent: "center",
  },
  squareText: {
    fontSize: 44,
    fontWeight: "bold",
  },
  moveButton: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 4,
    minWidth: 210,
    alignItems: "center",
  },
  moveText: {
    fontSize: 15,
  },
  sortButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  sortText: {
    fontSize: 15,
    fontWeight: "600",
  },
  currentMove: {
    fontSize: 15,
    fontWeight: "bold",
    paddingVertical: 9,
    marginVertical: 4,
  },
});
