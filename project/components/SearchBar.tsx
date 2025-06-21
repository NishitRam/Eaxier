import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, Mic } from 'lucide-react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, onFilterPress }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const colors = {
    background: isDark ? '#0F172A' : '#F8FAFC',
    searchBg: isDark ? '#1E293B' : '#FFFFFF',
    text: isDark ? '#F1F5F9' : '#1F2937',
    placeholder: isDark ? '#9CA3AF' : '#9CA3AF',
    icon: isDark ? '#E5E7EB' : '#333333',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.searchContainer, { backgroundColor: colors.searchBg }]}>
        <Search size={20} color={colors.placeholder} style={styles.searchIcon} />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Find here"
          placeholderTextColor={colors.placeholder}
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity style={styles.micButton} activeOpacity={0.7}>
          <Mic size={18} color={colors.icon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.filterButtonContainer}
        onPress={onFilterPress}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#0f2027', '#203a43', '#2c5364']}
          style={styles.filterButton}
        >
          <Filter size={20} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  micButton: {
    padding: 8,
  },
  filterButtonContainer: {
    borderRadius: 16,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
