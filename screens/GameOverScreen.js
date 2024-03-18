import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { PrimaryButton, Title } from "../components";
import SuccessImage from "../assets/images/success.png";
import { Colors } from "../constants";

const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }) => {
  const { width, height } = useWindowDimensions();
  let image = 300;

  if (width < 380) {
    image = 150;
  }
  if (height < 400) {
    image = 80;
  }

  const imageStyle = {
    width: image,
    height: image,
    borderRadius: image / 2,
  };

  return (
    <ScrollView contentContainerStyle={{flex:1}}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image style={styles.image} source={SuccessImage} />
        </View>
        <Text style={styles.summaryText}>
          You phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
          rounds to the guess the number{" "}
          <Text style={styles.highlight}>{userNumber}</Text>.
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
};

export default GameOverScreen;

// const deviceWidth = Dimensions.get("window").width;
// const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
