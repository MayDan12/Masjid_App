// import { useAuth } from "@/app/context/AuthContext";
// import { ThemedView } from "@/components/ThemedView";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { Button, KeyboardAvoidingView, Text, TextInput } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function Login() {
//   const { signIn, error } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSignIn = async () => {
//     console.log("Attempting sign in with", email, password);
//     try {
//       await signIn(email, password);
//       console.log("Sign in successful");
//     } catch (err) {
//       console.log("Sign in error:", err.message);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
//         <ThemedView style={{ padding: 20 }}>
//           <TextInput
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//             style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//           />
//           <TextInput
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//             style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//           />
//           <Button title="Sign In" onPress={handleSignIn} />
//           {error && <Text style={{ color: "red" }}>{error}</Text>}
//           <Button title="Sign Up" onPress={() => router.push("/signup")} />
//         </ThemedView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

import { useAuth } from "@/app/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

interface Theme {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  inputBackground: string;
}

const lightTheme: Theme = {
  background: "#f8fafc",
  surface: "#ffffff",
  primary: "#2C9544",
  secondary: "#0BA02E",
  text: "#1e293b",
  textSecondary: "#64748b",
  border: "#e2e8f0",
  error: "#ef4444",
  success: "#10b981",
  inputBackground: "#ffffff",
};

const darkTheme: Theme = {
  background: "#0f172a",
  surface: "#1e293b",
  primary: "#2C9544",
  secondary: "#0BA02E",
  text: "#f1f5f9",
  textSecondary: "#94a3b8",
  border: "#334155",
  error: "#f87171",
  success: "#34d399",
  inputBackground: "#1e293b",
};

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function EnhancedLogin() {
  const { signIn, error: authError } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // Focus states
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  React.useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSignIn = async () => {
    if (!validateForm()) {
      shakeAnimation();
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      console.log("Attempting sign in with", email);

      await signIn(email, password);
      console.log("Sign in successful");

      // Success feedback
      Alert.alert("Success", "Welcome back!", [
        { text: "OK", onPress: () => router.replace("/") },
      ]);
    } catch (err: any) {
      console.log("Sign in error:", err.message);

      // Handle specific errors
      let errorMessage = "An error occurred. Please try again.";
      if (err.message?.includes("user-not-found")) {
        errorMessage = "No account found with this email.";
      } else if (err.message?.includes("wrong-password")) {
        errorMessage = "Incorrect password.";
      } else if (err.message?.includes("invalid-email")) {
        errorMessage = "Invalid email address.";
      }

      setErrors({ general: errorMessage });
      shakeAnimation();
    } finally {
      setLoading(false);
    }
  };

  const clearFieldError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Background Gradient */}
      <LinearGradient
        colors={[theme.primary, theme.secondary]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View
              style={[
                styles.content,
                {
                  opacity: fadeAnim,
                  transform: [
                    { translateY: slideAnim },
                    { translateX: shakeAnim },
                  ],
                },
              ]}
            >
              {/* Header */}
              <View style={styles.header}>
                <View
                  style={[
                    styles.logoContainer,
                    { backgroundColor: theme.surface },
                  ]}
                >
                  <Ionicons name="moon" size={40} color={theme.primary} />
                </View>
                <Text style={[styles.title, { color: theme.text }]}>
                  Welcome Back
                </Text>
                <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                  Sign in to continue your spiritual journey
                </Text>
              </View>

              {/* Form */}
              <View style={styles.form}>
                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, { color: theme.text }]}>
                    Email Address
                  </Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        backgroundColor: theme.inputBackground,
                        borderColor: emailFocused
                          ? theme.primary
                          : errors.email
                          ? theme.error
                          : theme.border,
                      },
                      emailFocused && styles.inputFocused,
                      errors.email && styles.inputError,
                    ]}
                  >
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color={emailFocused ? theme.primary : theme.textSecondary}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: theme.text }]}
                      placeholder="Enter your email"
                      placeholderTextColor={theme.textSecondary}
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        clearFieldError("email");
                      }}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect={false}
                    />
                  </View>
                  {errors.email && (
                    <Animated.View style={styles.errorContainer}>
                      <Ionicons
                        name="alert-circle"
                        size={16}
                        color={theme.error}
                      />
                      <Text style={[styles.errorText, { color: theme.error }]}>
                        {errors.email}
                      </Text>
                    </Animated.View>
                  )}
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, { color: theme.text }]}>
                    Password
                  </Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        backgroundColor: theme.inputBackground,
                        borderColor: passwordFocused
                          ? theme.primary
                          : errors.password
                          ? theme.error
                          : theme.border,
                      },
                      passwordFocused && styles.inputFocused,
                      errors.password && styles.inputError,
                    ]}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={
                        passwordFocused ? theme.primary : theme.textSecondary
                      }
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: theme.text }]}
                      placeholder="Enter your password"
                      placeholderTextColor={theme.textSecondary}
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        clearFieldError("password");
                      }}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      secureTextEntry={!showPassword}
                      autoComplete="current-password"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color={theme.textSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Animated.View style={styles.errorContainer}>
                      <Ionicons
                        name="alert-circle"
                        size={16}
                        color={theme.error}
                      />
                      <Text style={[styles.errorText, { color: theme.error }]}>
                        {errors.password}
                      </Text>
                    </Animated.View>
                  )}
                </View>

                {/* Forgot Password */}
                <TouchableOpacity
                  style={styles.forgotPassword}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.forgotPasswordText,
                      { color: theme.primary },
                    ]}
                  >
                    Forgot Password?
                  </Text>
                </TouchableOpacity>

                {/* General Error */}
                {(errors.general || authError) && (
                  <Animated.View
                    style={[
                      styles.generalErrorContainer,
                      { backgroundColor: theme.error + "15" },
                    ]}
                  >
                    <Ionicons
                      name="alert-circle"
                      size={20}
                      color={theme.error}
                    />
                    <Text
                      style={[styles.generalErrorText, { color: theme.error }]}
                    >
                      {errors.general || authError}
                    </Text>
                  </Animated.View>
                )}

                {/* Sign In Button */}
                <TouchableOpacity
                  style={[
                    styles.signInButton,
                    loading && styles.signInButtonDisabled,
                  ]}
                  onPress={handleSignIn}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[theme.primary, theme.secondary]}
                    style={styles.signInGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    {loading ? (
                      <ActivityIndicator color="#ffffff" size="small" />
                    ) : (
                      <>
                        <Text style={styles.signInButtonText}>Sign In</Text>
                        <Ionicons
                          name="arrow-forward"
                          size={20}
                          color="#ffffff"
                        />
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.divider}>
                  <View
                    style={[
                      styles.dividerLine,
                      { backgroundColor: theme.border },
                    ]}
                  />
                  <Text
                    style={[styles.dividerText, { color: theme.textSecondary }]}
                  >
                    or
                  </Text>
                  <View
                    style={[
                      styles.dividerLine,
                      { backgroundColor: theme.border },
                    ]}
                  />
                </View>

                {/* Social Login */}
                <View style={styles.socialContainer}>
                  <TouchableOpacity
                    style={[
                      styles.socialButton,
                      {
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                      },
                    ]}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="logo-google" size={24} color="#4285f4" />
                  </TouchableOpacity>

                  {/* <TouchableOpacity
                    style={[
                      styles.socialButton,
                      {
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                      },
                    ]}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="logo-facebook" size={24} color="#1877f2" />
                  </TouchableOpacity> */}
                </View>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text
                  style={[styles.footerText, { color: theme.textSecondary }]}
                >
                  Don&apos;t have an account?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/signup")}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.signUpText, { color: theme.primary }]}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    opacity: 0.1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "Inter_700Bold",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    fontFamily: "Inter_400Regular",
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
    fontFamily: "Inter_400Regular",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    fontFamily: "Inter_400Regular",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputFocused: {
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputError: {
    shadowColor: "#ef4444",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Inter_400Regular",
  },
  eyeButton: {
    padding: 4,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 6,
  },
  errorText: {
    fontSize: 14,
    fontWeight: "500",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    fontWeight: "600",
  },
  generalErrorContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 12,
  },
  generalErrorText: {
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
    fontFamily: "Inter_400Regular",
  },
  signInButton: {
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  signInButtonDisabled: {
    opacity: 0.7,
  },
  signInGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    borderRadius: 16,
    gap: 8,
  },
  signInButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Inter_700Bold",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Inter_400Regular",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 12,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
  signUpText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Inter_700Bold",
  },
});
