import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Card, PrimaryButton, Title } from "../components";
import { Colors } from "../constants";
import InstructionText from "../components/ui/InstructionText";

const StartGameScreen = ({ pickedNumberHandler }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  const { width, height } = useWindowDimensions();

  const numberInputHandler = (value) => {
    setEnteredNumber(value);
  };

  const resetInputHandler = () => {
    setEnteredNumber("");
  };
  const confirmButtonPressedHandler = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Error", "Not a correct number", [
        {
          text: "Okay",
          style: "destructive",
          onPress: resetInputHandler,
        },
      ]);
      return;
    } else {
      pickedNumberHandler(chosenNumber);
    }
  };
  const resetButtonPressedHandler = () => {
    setEnteredNumber("");
  };

  const marginTopDistance = height < 380 ? 30 : 100;

  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={numberInputHandler}
              value={enteredNumber}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetButtonPressedHandler}>
                  Reset
                </PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmButtonPressedHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

const deviceHeight = Dimensions.get("window").height;

//ELEVANTION FOR SHADOW IN ANDROID AND SHADOW FOR IOS
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: deviceHeight < 380 ? 30 : 100,
    alignItems: "center",
  },
  numberInput: {
    height: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    width: 50,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
  },
});
