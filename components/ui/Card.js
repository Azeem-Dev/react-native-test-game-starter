import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { Colors } from "../../constants";

const Card = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default Card;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    alignItems: "center",
  },
});
