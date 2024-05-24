import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";

interface Props extends TextInputProps {
  label: string;
  icon?: React.ReactNode | string;
}

const Input = ({ label, icon, ...inputProps }: Props) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.textInput}>
        <TextInput
          style={styles.textInputInner}
          autoCorrect={false}
          autoCapitalize="none"
          {...inputProps}
        />
        <Text>{icon}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    gap: 4,
  },
  label: { color: GlobalStyles.colors.primary800 },
  textInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    overflow: "hidden",
  },
  textInputInner: {
    flex: 1,
    paddingVertical: 4,
  },
});

export default Input;
