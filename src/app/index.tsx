import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type SquareValue = "X" | "O" | null;

type SquareProps = {
  value: SquareValue;
  onSquareClick: () => void;
  highlight: boolean;
};

function Square({ value, onSquareClick, highlight }: SquareProps) {
  return (
    <Pressable
      style={[styles.square, highlight && styles.winningSquare]}
      onPress={onSquareClick}
    >
      <Text style={styles.squareText}>{value}</Text>
    </Pressable>
  );
}

type BoardProps = {
  xIsNext: boolean;
  squares: SquareValue[];
  onPlay: (nextSquares: SquareValue[]) => void;
};

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const winningLine = calculateWinningLine(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.every((square) => square !== null)) {
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
      <Text style={styles.status}>{status}</Text>
      {rows}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState<SquareValue[][]>([Array(9).fill(null)]);
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
    if (move === currentMove) {
      return (
        <Text key={move} style={styles.currentMove}>
          {"You are at move #" + move}
        </Text>
      );
    }
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <Pressable key={move} style={styles.moveButton} onPress={() => jumpTo(move)}>
        <Text style={styles.moveText}>{description}</Text>
      </Pressable>
    );
  });
  if (!isAscending) {
    moves.reverse();
  }

  return (
    <View style={styles.game}>
      <View style={styles.gameBoard}>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </View>
      <Pressable style={styles.sortButton} onPress={() => setIsAscending(!isAscending)}>
        <Text style={styles.sortText}>
          {isAscending ? "Sort: ascending ↑" : "Sort: descending ↓"}
        </Text>
      </Pressable>
      <ScrollView style={styles.gameInfo} contentContainerStyle={styles.gameInfoContent}>
        {moves}
      </ScrollView>
    </View>
  );
}

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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

const styles = StyleSheet.create({
  game: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 40,
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
    marginBottom: 10,
  },
  boardRow: {
    flexDirection: "row",
  },
  square: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "#999",
    marginTop: -1,
    marginRight: -1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  winningSquare: {
    backgroundColor: "#ffe066",
  },
  squareText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  moveButton: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginVertical: 3,
    minWidth: 200,
    alignItems: "center",
  },
  moveText: {
    fontSize: 16,
  },
  sortButton: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: "#333",
  },
  sortText: {
    color: "#fff",
    fontSize: 16,
  },
  currentMove: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 7,
    marginVertical: 3,
  },
});
