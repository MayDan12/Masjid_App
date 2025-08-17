import { useEffect } from "react";
import { Image, SafeAreaView } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function Loader({
  loading,
  isLoading,
}: {
  loading: boolean;
  isLoading: boolean;
}) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (loading || isLoading) {
      scale.value = withRepeat(
        withTiming(1.2, {
          duration: 800,
          easing: Easing.inOut(Easing.ease),
        }),
        -1, // infinite
        true // reverse
      );
    }
  }, [loading, isLoading, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  if (loading || isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1e293b", // slate-800
        }}
      >
        <Animated.View style={animatedStyle}>
          <Image
            source={require("@/assets/images/masjidlinkicon.png")}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
          />
        </Animated.View>
      </SafeAreaView>
    );
  }

  return null;
}
