import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Card, NumberContainer, PrimaryButton, Title } from "../components";
import { generateRandomBetween } from "../constants";
import InstructionText from "../components/ui/InstructionText";
import Ionicons from "@expo/vector-icons/Ionicons";
import GuessLogItem from "../components/game/GuessLogItem";

let minBoundary = 1;
let maxBoundary = 100;
let count = 0;
const GameScreen = ({ userNumber, setGameIsOver, getTotalRoundsNumber }) => {
  let initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);
  useEffect(() => {
    if (currentGuess == userNumber) {
      setGameIsOver(true);
      getTotalRoundsNumber(count);
      count = 0;
    }
  }, [currentGuess, userNumber]);

  const nextGuessHanlder = useCallback((direction) => {
    if (
      (direction == "-" && currentGuess < userNumber) ||
      (direction == "+" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie", "You know that this is wrong...", [
        {
          text: "Sorry!",
          style: "cancel",
        },
      ]);
      return;
    }
    if (direction == "-") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    let newGuess = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setGuessRounds((guesses) =>
      [...guesses, { id: guesses.length + 1, value: newGuess }].sort(
        (a, b) => b.id - a.id
      )
    );
    setCurrentGuess(newGuess);
    count++;
  });
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.cardContainer}>
        <InstructionText style={styles.instructionText}>
          Higer or lower
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHanlder.bind(this, "-")}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHanlder.bind(this, "+")}>
              <Ionicons name="add-sharp" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View>
        <FlatList
          data={guessRounds}
          renderItem={(round) => (
            <GuessLogItem
              guess={round.item.value}
              roundNumber={round.item.id}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 12,
  },
  screen: {
    flex: 1,
    padding: 12,
    marginTop: 100,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
