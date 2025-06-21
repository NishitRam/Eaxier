import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { state } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    // Give navigation time to initialize
    const timer = setTimeout(() => setIsNavigationReady(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isNavigationReady || state.isLoading) return;

    const inAuthGroup = segments[0] === 'auth';
    const inTabsGroup = segments[0] === '(tabs)';

    // Prevent navigation loops
    if (state.isAuthenticated && inAuthGroup) {
      // User is authenticated but on auth screen, redirect to tabs
      router.replace('/(tabs)');
      
    // } else if (!state.isAuthenticated && (inTabsGroup || segments.length === 0)) {
    //   // User is not authenticated but trying to access protected routes
    //   router.replace('/auth/login');
    // }
    } else if (
  !state.isAuthenticated &&
  (!segments.length || inTabsGroup)
) {
  router.replace('/auth/login');
}
  }, [state.isAuthenticated, state.isLoading, segments, isNavigationReady, router]);

  // Show loading while auth state is being determined
  if (state.isLoading || !isNavigationReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});