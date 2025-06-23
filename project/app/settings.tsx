import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { isDark, toggleTheme } = useTheme();
  const backgroundColor = isDark ? '#111827' : '#F9FAFB';
  const cardColor = isDark ? '#1F2937' : '#FFFFFF';
  const textColor = isDark ? '#F9FAFB' : '#111827';
  const subTextColor = isDark ? '#9CA3AF' : '#6B7280';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      
      <View style={[styles.header, { backgroundColor: cardColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={22} color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: textColor }]}>Settings</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        
        <View style={[styles.optionRow, { backgroundColor: cardColor }]}>
          <Text style={[styles.optionLabel, { color: textColor }]}>Dark Mode</Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>

        <View style={[styles.optionRow, { backgroundColor: cardColor }]}>
          <Text style={[styles.optionLabel, { color: textColor }]}>Notifications</Text>
          <Switch value={true} />
        </View>

        
        <View style={[styles.optionRow, { backgroundColor: cardColor }]}>
          <Text style={[styles.optionLabel, { color: textColor }]}>Language</Text>
          <Text style={[styles.optionValue, { color: subTextColor }]}>English</Text>
        </View>

        <View style={[styles.optionRow, { backgroundColor: cardColor }]}>
          <Text style={[styles.optionLabel, { color: textColor }]}>Help & Support</Text>
          <Text style={[styles.optionValue, { color: subTextColor }]}>Contact Us</Text>
        </View>

        <View style={[styles.optionRow, { backgroundColor: cardColor }]}>
          <Text style={[styles.optionLabel, { color: textColor }]}>Rate Us</Text>
          <Text style={[styles.optionValue, { color: subTextColor }]}>⭐ 4.8</Text>
        </View>

        <View style={[styles.optionRow, { backgroundColor: cardColor }]}>
          <Text style={[styles.optionLabel, { color: subTextColor }]}>App Version</Text>
          <Text style={[styles.optionValue, { color: textColor }]}>1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#00000020',
    elevation: 3,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionValue: {
    fontSize: 14,
  },
});
