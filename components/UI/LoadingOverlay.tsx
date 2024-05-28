import React from "react";
import { ActivityIndicator, View } from "react-native";

const LoadingOverlay = () => {
  return (
    <View>
      <ActivityIndicator size={"large"} color={"white"} />
    </View>
  );
};

export default LoadingOverlay;
