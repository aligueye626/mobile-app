import { Pressable, StyleSheet, Text, View } from "react-native";

type SquareProps = {
  value: string;
};

function Square({ value }: SquareProps) {
  return (
    <Pressable style={styles.square}>
      <Text style={styles.squareText}>{value}</Text>
    </Pressable>
  );
}

export default function Board() {
  return (
    <View style={styles.container}>
      <View style={styles.boardRow}>
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </View>
      <View style={styles.boardRow}>
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </View>
      <View style={styles.boardRow}>
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
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
  squareText: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
