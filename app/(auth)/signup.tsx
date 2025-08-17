import { useAuth } from "@/app/context/AuthContext";
import { signUpUser } from "@/services/auth";
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
  tabActive: string;
  tabInactive: string;
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
  tabActive: "#6366f1",
  tabInactive: "#94a3b8",
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
  tabActive: "#818cf8",
  tabInactive: "#64748b",
};

type UserRole = "user" | "imam";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  masjidName?: string;
  masjidWebsite?: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  masjidName?: string;
  masjidWebsite?: string;
  general?: string;
}

export default function EnhancedSignup() {
  const { error: authError } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  // Role state
  const [selectedRole, setSelectedRole] = useState<UserRole>("user");

  // Form state
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    masjidName: "",
    masjidWebsite: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Focus states
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const tabSlideAnim = useRef(new Animated.Value(0)).current;

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

  React.useEffect(() => {
    // Tab switch animation
    Animated.timing(tabSlideAnim, {
      toValue: selectedRole === "user" ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [selectedRole]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Imam-specific validations
    if (selectedRole === "imam") {
      if (!formData.masjidName?.trim()) {
        newErrors.masjidName = "Masjid name is required";
      }

      if (formData.masjidWebsite && formData.masjidWebsite.trim()) {
        const urlPattern =
          /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (!urlPattern.test(formData.masjidWebsite)) {
          newErrors.masjidWebsite = "Please enter a valid website URL";
        }
      }
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

  const handleSignUp = async () => {
    if (!validateForm()) {
      shakeAnimation();
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      console.log(
        "Attempting sign up with",
        formData.email,
        "as",
        selectedRole
      );

      // Include role and additional data in signup
      const userData = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role: selectedRole,
        ...(selectedRole === "imam" && {
          masjidName: formData.masjidName,
          masjidWebsite: formData.masjidWebsite,
        }),
        termsAccepted: true,
      };

      await signUpUser(userData);
      console.log("Sign up successful");

      // Success feedback
      Alert.alert(
        "Success",
        `Welcome! Your ${selectedRole} account has been created.`,
        [{ text: "OK", onPress: () => router.replace("/") }]
      );
    } catch (err: any) {
      console.log("Sign up error:", err.message);

      let errorMessage = "An error occurred. Please try again.";
      if (err.message?.includes("email-already-in-use")) {
        errorMessage = "An account with this email already exists.";
      } else if (err.message?.includes("weak-password")) {
        errorMessage =
          "Password is too weak. Please choose a stronger password.";
      } else if (err.message?.includes("invalid-email")) {
        errorMessage = "Invalid email address.";
      }

      setErrors({ general: errorMessage });
      shakeAnimation();
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const renderInput = (
    field: keyof FormData,
    label: string,
    placeholder: string,
    icon: string,
    options: {
      secureTextEntry?: boolean;
      keyboardType?: any;
      autoCapitalize?: any;
      autoComplete?: any;
      showPasswordToggle?: boolean;
      passwordVisible?: boolean;
      onTogglePassword?: () => void;
    } = {}
  ) => {
    const isFocused = focusedField === field;
    const hasError = !!errors[field];

    return (
      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>{label}</Text>
        <View
          style={[
            styles.inputWrapper,
            {
              backgroundColor: theme.inputBackground,
              borderColor: isFocused
                ? theme.primary
                : hasError
                ? theme.error
                : theme.border,
            },
            isFocused && styles.inputFocused,
            hasError && styles.inputError,
          ]}
        >
          <Ionicons
            name={icon as any}
            size={20}
            color={isFocused ? theme.primary : theme.textSecondary}
            style={styles.inputIcon}
          />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder={placeholder}
            placeholderTextColor={theme.textSecondary}
            value={formData[field] || ""}
            onChangeText={(text) => updateFormData(field, text)}
            onFocus={() => setFocusedField(field)}
            onBlur={() => setFocusedField(null)}
            secureTextEntry={options.secureTextEntry}
            keyboardType={options.keyboardType || "default"}
            autoCapitalize={options.autoCapitalize || "sentences"}
            autoComplete={options.autoComplete}
            autoCorrect={false}
          />
          {options.showPasswordToggle && (
            <TouchableOpacity
              onPress={options.onTogglePassword}
              style={styles.eyeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={
                  options.passwordVisible ? "eye-off-outline" : "eye-outline"
                }
                size={20}
                color={theme.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
        {errors[field] && (
          <Animated.View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={16} color={theme.error} />
            <Text style={[styles.errorText, { color: theme.error }]}>
              {errors[field]}
            </Text>
          </Animated.View>
        )}
      </View>
    );
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
                  <Ionicons name="person-add" size={40} color={theme.primary} />
                </View>
                <Text style={[styles.title, { color: theme.text }]}>
                  Create Account
                </Text>
                <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                  Join our community and start your spiritual journey
                </Text>
              </View>

              {/* Role Tabs */}
              <View
                style={[
                  styles.tabContainer,
                  { backgroundColor: theme.surface },
                ]}
              >
                <Animated.View
                  style={[
                    styles.tabIndicator,
                    { backgroundColor: theme.primary },
                    {
                      transform: [
                        {
                          translateX: tabSlideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, width * 0.4],
                          }),
                        },
                      ],
                    },
                  ]}
                />
                <TouchableOpacity
                  style={styles.tab}
                  onPress={() => setSelectedRole("user")}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="person"
                    size={20}
                    color={
                      selectedRole === "user" ? "#ffffff" : theme.textSecondary
                    }
                  />
                  <Text
                    style={[
                      styles.tabText,
                      {
                        color:
                          selectedRole === "user"
                            ? "#ffffff"
                            : theme.textSecondary,
                        fontWeight: selectedRole === "user" ? "bold" : "500",
                      },
                    ]}
                  >
                    Member
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.tab}
                  onPress={() => setSelectedRole("imam")}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="library"
                    size={20}
                    color={
                      selectedRole === "imam" ? "#ffffff" : theme.textSecondary
                    }
                  />
                  <Text
                    style={[
                      styles.tabText,
                      {
                        color:
                          selectedRole === "imam"
                            ? "#ffffff"
                            : theme.textSecondary,
                        fontWeight: selectedRole === "imam" ? "bold" : "500",
                      },
                    ]}
                  >
                    Imam
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Form */}
              <View style={styles.form}>
                {/* Common Fields */}
                {renderInput(
                  "fullName",
                  "Full Name",
                  "Enter your full name",
                  "person-outline",
                  { autoCapitalize: "words", autoComplete: "name" }
                )}

                {renderInput(
                  "email",
                  "Email Address",
                  "Enter your email",
                  "mail-outline",
                  {
                    keyboardType: "email-address",
                    autoCapitalize: "none",
                    autoComplete: "email",
                  }
                )}

                {renderInput(
                  "password",
                  "Password",
                  "Create a strong password",
                  "lock-closed-outline",
                  {
                    secureTextEntry: !showPassword,
                    showPasswordToggle: true,
                    passwordVisible: showPassword,
                    onTogglePassword: () => setShowPassword(!showPassword),
                    autoComplete: "new-password",
                  }
                )}

                {renderInput(
                  "confirmPassword",
                  "Confirm Password",
                  "Confirm your password",
                  "checkmark-circle-outline",
                  {
                    secureTextEntry: !showConfirmPassword,
                    showPasswordToggle: true,
                    passwordVisible: showConfirmPassword,
                    onTogglePassword: () =>
                      setShowConfirmPassword(!showConfirmPassword),
                    autoComplete: "new-password",
                  }
                )}

                {/* Imam-specific Fields */}
                {selectedRole === "imam" && (
                  <>
                    {renderInput(
                      "masjidName",
                      "Masjid Name",
                      "Enter your masjid name",
                      "business-outline",
                      { autoCapitalize: "words" }
                    )}

                    {renderInput(
                      "masjidWebsite",
                      "Masjid Website (Optional)",
                      "https://yourmasjid.com",
                      "globe-outline",
                      { keyboardType: "url", autoCapitalize: "none" }
                    )}
                  </>
                )}

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

                {/* Sign Up Button */}
                <TouchableOpacity
                  style={[
                    styles.signUpButton,
                    loading && styles.signUpButtonDisabled,
                  ]}
                  onPress={handleSignUp}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[theme.primary, theme.secondary]}
                    style={styles.signUpGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    {loading ? (
                      <ActivityIndicator color="#ffffff" size="small" />
                    ) : (
                      <>
                        <Text style={styles.signUpButtonText}>
                          Create {selectedRole === "imam" ? "Imam" : "Member"}{" "}
                          Account
                        </Text>
                        <Ionicons
                          name="arrow-forward"
                          size={20}
                          color="#ffffff"
                        />
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                {/* Terms */}
                <Text
                  style={[styles.termsText, { color: theme.textSecondary }]}
                >
                  By creating an account, you agree to our{" "}
                  <Text style={{ color: theme.primary, fontWeight: "600" }}>
                    Terms of Service
                  </Text>{" "}
                  and{" "}
                  <Text style={{ color: theme.primary, fontWeight: "600" }}>
                    Privacy Policy
                  </Text>
                </Text>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text
                  style={[styles.footerText, { color: theme.textSecondary }]}
                >
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/login")}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.signInText, { color: theme.primary }]}>
                    Sign In
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
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
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
  tabContainer: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 4,
    marginBottom: 32,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabIndicator: {
    position: "absolute",
    top: 4,
    left: 4,
    width: width * 0.4,
    height: 48,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    gap: 8,
    zIndex: 1,
  },
  tabText: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
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
    fontFamily: "Inter_400Regular",
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
  signUpButton: {
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  signUpButtonDisabled: {
    opacity: 0.7,
  },
  signUpGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    borderRadius: 16,
    gap: 8,
  },
  signUpButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Inter_700Bold",
  },
  termsText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
    fontFamily: "Inter_400Regular",
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
  signInText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Inter_700Bold",
  },
});
