// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//   Image,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const onboardingData = [
//   {
//     title: "Prayer Alert",
//     description:
//       "Choose your adhan, which prayers to be notified of and how often",
//     image: require("@/assets/images/prayerboard1.png"),
//   },
//   {
//     title: "Welcome to Masjid App",
//     description: "Find nearby masjids, prayer times, and events.",
//     image: require("@/assets/images/onboard2.png"),
//   },
//   {
//     title: "Stay Connected",
//     description: "Get notifications for prayer times and community updates.",
//     image: require("@/assets/images/onboard3.png"),
//   },
//   {
//     title: "Join the Community",
//     description: "Participate in events and connect with others.",
//     image: require("@/assets/images/onboard4.png"),
//   },
// ];

// const Onboarding = ({ navigation }: any) => {
//   const [step, setStep] = useState(0);
//   const router = useRouter();

//   const handleNext = () => {
//     if (step < onboardingData.length - 1) {
//       setStep(step + 1);
//     } else {
//       router.replace("/(auth)/signup"); // Change to your login screen route
//     }
//   };

//   return (
//     <LinearGradient
//       colors={["#0f172a", "#192b55", "#122e6e"]}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//       style={styles.container}
//     >
//       <SafeAreaView style={styles.container}>
//         <Image source={onboardingData[step].image} style={styles.image} />
//         <Text className="text-sand" style={styles.title}>
//           {onboardingData[step].title}
//         </Text>
//         <Text className="text-sand" style={styles.description}>
//           {onboardingData[step].description}
//         </Text>
//         <View style={styles.dots}>
//           {onboardingData.map((_, idx) => (
//             <View
//               key={idx}
//               style={[styles.dot, step === idx && styles.activeDot]}
//               className="bg-sand"
//             />
//           ))}
//         </View>
//         <TouchableOpacity style={styles.button} onPress={handleNext}>
//           <Text style={styles.buttonText}>
//             {step === onboardingData.length - 1 ? "Get Started" : "Next"}
//           </Text>
//         </TouchableOpacity>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//   },
//   image: {
//     width: 350,
//     height: 350,
//     marginBottom: 32,
//     resizeMode: "contain",
//   },
//   title: {
//     fontSize: 28,
//     marginBottom: 16,
//     textAlign: "center",
//     fontFamily: "Inter_600SemiBold",
//   },
//   description: {
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 32,
//     fontFamily: "Inter_500Regular",
//   },
//   dots: {
//     flexDirection: "row",
//     marginBottom: 32,
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   activeDot: {
//     backgroundColor: "#10b981",
//   },
//   button: {
//     backgroundColor: "#10b981",
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     borderRadius: 25,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//   },
// });

// export default Onboarding;

import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const onboardingData = [
  {
    title: "Prayer Alert",
    description:
      "Choose your adhan, which prayers to be notified of and how often",
    image: require("@/assets/images/prayerboard1.png"),
  },
  {
    title: "Welcome to Masjid App",
    description: "Find nearby masjids, prayer times, and events.",
    image: require("@/assets/images/onboard2.png"),
  },
  {
    title: "Stay Connected",
    description: "Get notifications for prayer times and community updates.",
    image: require("@/assets/images/onboard3.png"),
  },
  {
    title: "Join the Community",
    description: "Participate in events and connect with others.",
    image: require("@/assets/images/onboard4.png"),
  },
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (step < onboardingData.length - 1) {
      setStep(step + 1);
    } else {
      router.replace("/(auth)/signup");
    }
  };

  return (
    <LinearGradient
      colors={["#FFFFFF", "#F5F5DC"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <Image source={onboardingData[step].image} style={styles.image} />

        <Text style={styles.title}>{onboardingData[step].title}</Text>
        <Text style={styles.description}>
          {onboardingData[step].description}
        </Text>

        <View style={styles.dots}>
          {onboardingData.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                step === idx ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleNext}>
          <LinearGradient
            colors={["#2E7D32", "#66BB6A"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {step === onboardingData.length - 1 ? "Get Started" : "Next"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 32,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
    color: "#2E7D32", // Emerald Green
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    fontFamily: "Inter_500Regular",
    color: "#0D1B2A", // Midnight Blue
  },
  dots: {
    flexDirection: "row",
    marginBottom: 32,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  inactiveDot: {
    backgroundColor: "#898D86", // Beige
  },
  activeDot: {
    backgroundColor: "#2E7D32", // Green
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
});

export default Onboarding;
