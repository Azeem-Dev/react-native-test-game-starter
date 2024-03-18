import {
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { GameOverScreen, GameScreen, StartGameScreen } from "./screens";
import { LinearGradient } from "expo-linear-gradient";
import DicesImage from "./assets/images/dices.jpg";
import { useCallback, useEffect, useState } from "react";
import { Colors } from "./constants";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const [roundsNumber, setRoundsNumber] = useState(0);

  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
          "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
  };

  const getScreen = () => {
    if (userNumber && !gameIsOver) {
      return (
        <GameScreen
          userNumber={userNumber}
          setGameIsOver={(val) => setGameIsOver(val)}
          getTotalRoundsNumber={(num) => {
            setRoundsNumber(num);
          }}
        />
      );
    } else if (!userNumber && !gameIsOver) {
      return <StartGameScreen pickedNumberHandler={pickedNumberHandler} />;
    } else if (gameIsOver) {
      return (
        <GameOverScreen
          roundsNumber={roundsNumber}
          userNumber={userNumber}
          onStartNewGame={() => {
            setGameIsOver(false);
            setUserNumber(null);
          }}
        />
      );
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent400]}
        style={styles.rootContainer}
        onLayout={onLayoutRootView}
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
    </>
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
