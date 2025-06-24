import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationContext = createContext();

const initialState = {
  isEnabled: false,
  hasPermission: false,
  expoPushToken: null,
};

function notificationReducer(state, action) {
  switch (action.type) {
    case 'SET_PERMISSION':
      return { ...state, hasPermission: action.payload };
    case 'SET_ENABLED':
      return { ...state, isEnabled: action.payload };
    case 'SET_PUSH_TOKEN':
      return { ...state, expoPushToken: action.payload };
    default:
      return state;
  }
}

export function NotificationProvider({ children }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  useEffect(() => {
    // Load saved notification settings
    loadNotificationSettings();
    // Configure notification handler
    configureNotifications();
  }, []);

  const loadNotificationSettings = async () => {
    try {
      const isEnabled = await AsyncStorage.getItem('notificationsEnabled');
      if (isEnabled !== null) {
        dispatch({ type: 'SET_ENABLED', payload: JSON.parse(isEnabled) });
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
  };

  const configureNotifications = () => {
    // Configure how notifications are handled when app is in foreground
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  };

  const requestPermission = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      const isGranted = status === 'granted';
      dispatch({ type: 'SET_PERMISSION', payload: isGranted });
      
      if (isGranted) {
        // Get Expo push token
        const token = await registerForPushNotifications();
        dispatch({ type: 'SET_PUSH_TOKEN', payload: token });
        // Enable notifications by default when permission is granted
        await toggleNotifications(true);
      }
      
      return isGranted;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  const registerForPushNotifications = async () => {
    try {
      const { data: token } = await Notifications.getExpoPushTokenAsync({
        projectId: 'your-expo-project-id', // Replace with your Expo project ID
      });
      return token;
    } catch (error) {
      console.error('Error getting push token:', error);
      return null;
    }
  };

  const toggleNotifications = async (forcedState) => {
    try {
      const newState = forcedState !== undefined ? forcedState : !state.isEnabled;
      await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(newState));
      dispatch({ type: 'SET_ENABLED', payload: newState });
    } catch (error) {
      console.error('Error toggling notifications:', error);
    }
  };

  const sendLocalNotification = async (title, body) => {
    if (!state.isEnabled || !state.hasPermission) return;

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
        },
        trigger: null, // null means show immediately
      });
    } catch (error) {
      console.error('Error sending local notification:', error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        state,
        requestPermission,
        toggleNotifications,
        sendLocalNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);