import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { ServiceCard } from '@/components/ServiceCard';
import { SearchBar } from '@/components/SearchBar';
import { Bell, BellOff, Sparkles, TrendingUp, Clock, Star } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { state, dispatch } = useApp();
  const { state: authState } = useAuth();
  const { state: notificationState, requestPermission, toggleNotifications } = useNotifications();
  const [refreshing, setRefreshing] = useState(false);

  const services = useMemo(() => {
    let filtered = state.services;
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query) ||
          s.provider.toLowerCase().includes(query) ||
          s.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    return filtered;
  }, [state.services, state.searchQuery]);

  const featuredServices = useMemo(
    () => state.services.filter((s) => s.rating >= 4.8).slice(0, 3),
    [state.services]
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((res) => setTimeout(res, 1000));
    setRefreshing(false);
  };

  const handleNotificationPress = async () => {
    if (!notificationState.hasPermission) await requestPermission();
    else toggleNotifications();
  };

  const gridItems = [
    { label: "Women's Salon & Spa", icon: 'https://i.pinimg.com/736x/10/a1/bc/10a1bc841d048bcdec3a83ec0351f1c3.jpg' },
    { label: "Men's Salon & Massage", icon: 'https://thumbs.dreamstime.com/z/massage-green-icon-logo-vector-design-illustration-massage-green-icon-logo-vector-119104628.jpg' },
    { label: 'AC & Appliance Repair', icon: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/air-purifier-6550892-5799564.png' },
    { label: 'Cleaning', icon: 'https://tse2.mm.bing.net/th?id=OIP.hywVEtLakf5KZUavG-BSUgHaFL&pid=Api&P=0&h=180' },
    { label: 'Electrician, Plumber & Carpenter', icon: 'https://tse4.mm.bing.net/th?id=OIP.pX8j1SJg__wT8BAPV7e0kAHaHa&pid=Api&P=0&h=180' },
    { label: 'Water Purifier', icon: 'https://tse4.mm.bing.net/th?id=OIP.ApoIHzKvE_gwuz8SKMZSKQAAAA&pid=Api&P=0&h=180' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.headerGradient}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.heyText}>Hey, {authState.user?.name || 'User'}</Text>
            <Text style={styles.addressText}>Chandaka Industrial Estate - Infocity</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={handleNotificationPress}>
            {notificationState.isEnabled ? (
              <Bell size={24} color="#fff" />
            ) : (
              <BellOff size={24} color="#fff" />
            )}
            {notificationState.isEnabled && <View style={styles.notificationDot} />}
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Search Bar below header */}
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <SearchBar
            value={state.searchQuery}
            onChangeText={(text) => dispatch({ type: 'SET_SEARCH_QUERY', payload: text })}
            onFilterPress={() => {}}
          />
        </View>

        {/* Grid Icons */}
        <View style={styles.gridContainer}>
          {gridItems.map((item, index) => (
            <View key={index} style={styles.gridItem}>
              <Image source={{ uri: item.icon }} style={styles.gridIcon} />
              <Text style={styles.gridLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <LinearGradient colors={['#4158D0', '#C850C0']} style={styles.statCard}>
            <TrendingUp size={24} color="#fff" />
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Services</Text>
          </LinearGradient>
          <LinearGradient colors={['#0093E9', '#80D0C7']} style={styles.statCard}>
            <Clock size={24} color="#fff" />
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Available</Text>
          </LinearGradient>
          <LinearGradient colors={['#43e97b', '#f9ea8f']} style={styles.statCard}>
            <Star size={24} color="#fff" />
            <Text style={styles.statNumber}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </LinearGradient>
        </View>

        {/* Featured */}
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Sparkles size={20} color="#667eea" />
              <Text style={styles.sectionTitle}>Featured Services</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {featuredServices.map((s) => (
              <View key={s.id} style={{ width: width * 0.7, marginRight: 16 }}>
                <ServiceCard service={s} featured />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* All Services */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 80 }}>
          <Text style={styles.sectionTitle}>All Services</Text>
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  headerGradient: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  heyText: { fontSize: 18, color: '#fff', fontWeight: '600' },
  addressText: { fontSize: 14, color: '#d1d5db', marginTop: 4 },
  notificationButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 24,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    justifyContent: 'space-between',
  },
  gridItem: { width: '30%', alignItems: 'center', marginBottom: 20 },
  gridIcon: { width: 50, height: 50, marginBottom: 6 },
  gridLabel: { textAlign: 'center', fontSize: 12, color: '#374151' },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: { color: '#fff', fontWeight: 'bold', fontSize: 18, marginTop: 8 },
  statLabel: { color: '#fff', fontSize: 12, marginTop: 4 },
  featuredSection: { marginTop: 20, marginBottom: 10 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitleContainer: { flexDirection: 'row', alignItems: 'center' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 8,
    marginBottom: 4,
  },
  viewAllText: { fontSize: 14, color: '#667eea' },
});
