import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';

interface NotificationState {
  isEnabled: boolean;
  hasPermission: boolean;
}

interface NotificationContextType {
  state: NotificationState;
  requestPermission: () => Promise<boolean>;
  toggleNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<NotificationState>({
    isEnabled: false,
    hasPermission: false,
  });

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = async () => {
    if (Platform.OS === 'web') {
      // Web notification permission check
      if ('Notification' in window) {
        const permission = Notification.permission;
        setState(prev => ({
          ...prev,
          hasPermission: permission === 'granted',
          isEnabled: permission === 'granted',
        }));
      }
    }
  };

  const requestPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'web') {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        const granted = permission === 'granted';
        setState(prev => ({
          ...prev,
          hasPermission: granted,
          isEnabled: granted,
        }));
        return granted;
      }
    }
    return false;
  };

  const toggleNotifications = () => {
    setState(prev => ({
      ...prev,
      isEnabled: !prev.isEnabled,
    }));
  };

  return (
    <NotificationContext.Provider value={{ state, requestPermission, toggleNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};