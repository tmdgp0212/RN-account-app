import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const IconButton = ({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress: () => void;
}) => {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.buttonContainer, { opacity: 0.8 }]
          : styles.buttonContainer
      }
      onPress={onPress}
    >
      <Text>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 8,
    padding: 6,
  },
});

export default IconButton;
