import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';
import Checkbox from 'expo-checkbox';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });
  const { login, state } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const newErrors = { email: '', password: '', general: '' };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const success = await login(email, password);
      if (success) {
        router.replace('/(tabs)');
      } else {
        setErrors((prev) => ({
          ...prev,
          general: 'Invalid email or password',
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: 'Login failed. Please try again.',
      }));
    }
  };
  const handleGoogleLogin = async () => {
    // Implement Google login logic here
    try {
      console.log('Google login pressed');
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: 'Google login failed. Please try again.',
      }));
    }
  };

  const handleFacebookLogin = async () => {
    try {
      console.log('Facebook login pressed');
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: 'Facebook login failed. Please try again.',
      }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#0D324D', '#95FAEA']} style={styles.background}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {' '}
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.content}>
              <View style={styles.header}>
                <View style={styles.logoContainer}>
                  <LinearGradient
                    colors={['#FFFFFF', '#F8FAFC']}
                    style={styles.logoGradient}
                  >
                    <Image
                      source={require('../../assets/images/Transparent_logo.png')}
                      style={styles.logo}
                    />
                  </LinearGradient>
                </View>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>
                  Sign in to continue to Eaxier
                </Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.form}>
                  <View style={styles.inputContainer}>
                    <View
                      style={[
                        styles.inputWrapper,
                        errors.email && styles.inputError,
                      ]}
                    >
                      <Mail
                        size={20}
                        color="#9CA3AF"
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Email address"
                        placeholderTextColor="#9CA3AF"
                        value={email}
                        onChangeText={(text) => {
                          setEmail(text);
                          if (errors.email)
                            setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        editable={!state.isLoading}
                      />
                    </View>
                    {errors.email ? (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    ) : null}
                  </View>

                  <View style={styles.inputContainer}>
                    <View
                      style={[
                        styles.inputWrapper,
                        errors.password && styles.inputError,
                      ]}
                    >
                      <Lock
                        size={20}
                        color="#9CA3AF"
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#9CA3AF"
                        value={password}
                        onChangeText={(text) => {
                          setPassword(text);
                          if (errors.password)
                            setErrors((prev) => ({ ...prev, password: '' }));
                        }}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        editable={!state.isLoading}
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeButton}
                        disabled={state.isLoading}
                      >
                        {showPassword ? (
                          <EyeOff size={20} color="#9CA3AF" />
                        ) : (
                          <Eye size={20} color="#9CA3AF" />
                        )}
                      </TouchableOpacity>
                    </View>
                    {errors.password ? (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    ) : null}
                  </View>

                  <View style={styles.rememberMeContainer}>
                    <Checkbox
                      value={rememberMe}
                      onValueChange={setRememberMe}
                      color={rememberMe ? '#667eea' : undefined}
                      style={styles.checkbox}
                    />
                    <Text style={styles.rememberMeText}>Remember me</Text>
                  </View>
                  {errors.general ? (
                    <Text style={styles.errorText}>{errors.general}</Text>
                  ) : null}
                  <TouchableOpacity
                    style={[
                      styles.loginButtonContainer,
                      state.isLoading && styles.loginButtonDisabled,
                    ]}
                    onPress={handleLogin}
                    disabled={state.isLoading}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={
                        state.isLoading
                          ? ['#9CA3AF', '#6B7280']
                          : ['#FFFFFF', '#F8FAFC']
                      }
                      style={styles.loginButton}
                    >
                      {state.isLoading ? (
                        <ActivityIndicator color="#667eea" />
                      ) : (
                        <Text style={styles.loginButtonText}>Sign In</Text>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                  <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>OR</Text>
                    <View style={styles.divider} />
                  </View>

                  <View style={styles.socialButtonsContainer}>
                    <TouchableOpacity
                      style={styles.socialButton}
                      onPress={handleGoogleLogin}
                      activeOpacity={0.8}
                    >
                      <Image
                        source={require('../../assets/images/google-icon.webp')}
                        style={styles.socialIcon}
                      />
                      <Text style={styles.socialButtonText}>Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.socialButton}
                      onPress={handleFacebookLogin}
                      activeOpacity={0.8}
                    >
                      <Image
                        source={require('../../assets/images/facebook-icon.png')}
                        style={styles.socialIcon}
                      />
                      <Text style={styles.socialButtonText}>Facebook</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  Don't have an account?{' '}
                  <Link href="/auth/signup" style={styles.linkText}>
                    Sign Up
                  </Link>
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1, // This ensures the content can grow and be scrollable
    justifyContent: 'center', // This keeps the vertical centering when content fits screen
    minHeight: '100%',
  },
  content: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 24,
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  logoGradient: {
    borderRadius: 50,
    padding: 4,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  eyeButton: {
    padding: 8,
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#EF4444',
  },
  loginButtonContainer: {
    borderRadius: 16,
    marginTop: 8,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  loginButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#667eea',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  linkText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    textDecorationLine: 'underline',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    margin: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#667eea',
  },
  rememberMeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    marginLeft: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    padding: 12,
    height: 56,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  socialButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
});
