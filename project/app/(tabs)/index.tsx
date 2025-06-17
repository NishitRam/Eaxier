import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { ServiceCard } from '@/components/ServiceCard';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Service } from '@/types';
import { Bell, BellOff, Sparkles, TrendingUp, Clock, Star } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { state, dispatch } = useApp();
  const { state: authState } = useAuth();
  const { state: notificationState, requestPermission, toggleNotifications } = useNotifications();
  const [refreshing, setRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const allCategories = ['All', ...new Set(state.services.map(service => service.category))];
    return allCategories;
  }, [state.services]);

  const filteredServices = useMemo(() => {
    let filtered = state.services;

    if (state.selectedCategory !== 'All') {
      filtered = filtered.filter(service => service.category === state.selectedCategory);
    }

    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.provider.toLowerCase().includes(query) ||
        service.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [state.services, state.selectedCategory, state.searchQuery]);

  const featuredServices = useMemo(() => {
    return state.services.filter(service => service.rating >= 4.8).slice(0, 3);
  }, [state.services]);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleSearchChange = (text: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: text });
  };

  const handleCategorySelect = (category: string) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
  };

  const handleFilterPress = () => {
    setShowFilters(!showFilters);
  };

  const handleNotificationPress = async () => {
    if (!notificationState.hasPermission) {
      await requestPermission();
    } else {
      toggleNotifications();
    }
  };

  const renderService = ({ item }: { item: Service }) => (
    <ServiceCard service={item} />
  );

  const renderHeader = () => (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.headerGradient}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Good day,</Text>
            <Text style={styles.userName}>{authState.user?.name || 'User'}</Text>
            <Text style={styles.subtitle}>What service do you need today?</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton} 
            onPress={handleNotificationPress}
            activeOpacity={0.8}
          >
            {notificationState.isEnabled ? (
              <Bell size={24} color="#FFFFFF" />
            ) : (
              <BellOff size={24} color="#FFFFFF" />
            )}
            {notificationState.isEnabled && <View style={styles.notificationDot} />}
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );

  const renderFeaturedSection = () => (
    <View style={styles.featuredSection}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <Sparkles size={20} color="#667eea" />
          <Text style={styles.sectionTitle}>Featured Services</Text>
        </View>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuredScrollContent}
      >
        {featuredServices.map((service) => (
          <View key={service.id} style={styles.featuredCard}>
            <ServiceCard service={service} featured />
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderStatsSection = () => (
    <View style={styles.statsSection}>
      <LinearGradient
        colors={['#f093fb', '#f5576c']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.statCard}
      >
        <TrendingUp size={24} color="#FFFFFF" />
        <Text style={styles.statNumber}>500+</Text>
        <Text style={styles.statLabel}>Services</Text>
      </LinearGradient>
      
      <LinearGradient
        colors={['#4facfe', '#00f2fe']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.statCard}
      >
        <Clock size={24} color="#FFFFFF" />
        <Text style={styles.statNumber}>24/7</Text>
        <Text style={styles.statLabel}>Available</Text>
      </LinearGradient>
      
      <LinearGradient
        colors={['#43e97b', '#38f9d7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.statCard}
      >
        <Star size={24} color="#FFFFFF" />
        <Text style={styles.statNumber}>4.9</Text>
        <Text style={styles.statLabel}>Rating</Text>
      </LinearGradient>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No services found</Text>
      <Text style={styles.emptySubtitle}>
        Try adjusting your search or filters
      </Text>
    </View>
  );

  if (state.isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.loadingContainer}
        >
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Loading services...</Text>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      
      <SearchBar
        value={state.searchQuery}
        onChangeText={handleSearchChange}
        onFilterPress={handleFilterPress}
      />
      
      {(showFilters || state.selectedCategory !== 'All') && (
        <CategoryFilter
          categories={categories}
          selectedCategory={state.selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      )}

      <FlatList
        data={filteredServices}
        renderItem={renderService}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#667eea']}
            tintColor="#667eea"
          />
        }
        ListHeaderComponent={
          <View>
            {renderStatsSection()}
            {renderFeaturedSection()}
            <View style={styles.allServicesHeader}>
              <Text style={styles.allServicesTitle}>All Services</Text>
            </View>
          </View>
        }
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerGradient: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 32,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userName: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  notificationButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginTop: 12,
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  featuredSection: {
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginLeft: 8,
  },
  viewAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#667eea',
  },
  featuredScrollContent: {
    paddingHorizontal: 20,
  },
  featuredCard: {
    marginRight: 16,
    width: width * 0.75,
  },
  allServicesHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  allServicesTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
});