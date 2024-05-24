import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const PrimaryButton = ({
  onPress,
  variation = "button",
  style,
  children,
}: {
  onPress?: () => void;
  variation?: "button" | "flat";
  style?: StyleSheet.NamedStyles<any>;
  children?: React.ReactNode;
}) => {
  return (
    <View style={variation === "flat" ? styles.flat : styles.button}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.innerContainer,
          pressed && Platform.OS === "ios" && { opacity: 0.6 },
          style?.button,
        ]}
        android_ripple={{
          color:
            variation === "flat" ? GlobalStyles.colors.primary100 : "#525A23",
        }}
      >
        <Text
          style={variation === "flat" ? styles.flatText : styles.buttonText}
        >
          {children}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary700,
    overflow: "hidden",
  },
  flat: { borderRadius: 8, overflow: "hidden" },
  innerContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: GlobalStyles.colors.primary50 },
  flatText: {
    color: GlobalStyles.colors.primary800,
    textDecorationLine: "underline",
  },
});

export default PrimaryButton;
