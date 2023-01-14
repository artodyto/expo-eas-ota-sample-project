import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  const progressAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
  const animate = () => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animate();
  }, [progress]);

  return (
    <Animated.View
      style={{
        height: 10,
        backgroundColor: "#cbd5e1",
        borderRadius: 10 / 2,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={[
          {
            height: "100%",
            backgroundColor: "#8b5cf6",
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
            borderTopRightRadius: 10 / 2,
            borderBottomRightRadius: 10 / 2,
          },
        ]}
      />
    </Animated.View>
  );
};

export default ProgressBar;
