import { StyleSheet, View, ImageBackground, SafeAreaView } from "react-native";
import { GameOverScreen, GameScreen, StartGameScreen } from "./screens";
import { LinearGradient } from "expo-linear-gradient";
import DicesImage from "./assets/images/dices.jpg";
import { useState } from "react";
import { Colors } from "./constants";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(false);

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
  };

  const getScreen = () => {
    if (userNumber && !gameIsOver) {
      return (
        <GameScreen
          userNumber={userNumber}
          setGameIsOver={(val) => setGameIsOver(val)}
        />
      );
    } else if (!userNumber && !gameIsOver) {
      return <StartGameScreen pickedNumberHandler={pickedNumberHandler} />;
    } else if (gameIsOver) {
      return <GameOverScreen />;
    }
  };

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent400]}
      style={styles.rootContainer}
    >
      <ImageBackground
        source={DicesImage}
        style={styles.imageContainer}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{getScreen()}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  rootContainer: {
    backgroundColor: Colors.accent400,
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.2,
  },
});
