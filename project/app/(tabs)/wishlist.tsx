import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useApp } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';
import { Service } from '@/types';
import { Heart, Star, Plus, Trash2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function WishlistScreen() {
  const { state, addToCart, removeFromWishlist } = useApp();
  const { isDark } = useTheme();
  const router = useRouter();

  const handleServicePress = (serviceId: number) => {
    router.push(`/service/₹{serviceId}`);
  };

  const handleAddToCart = (service: Service) => {
    addToCart(service);
  };

  const handleRemoveFromWishlist = (serviceId: number) => {
    removeFromWishlist(serviceId);
  };

  const renderWishlistItem = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' },
      ]}
      onPress={() => handleServicePress(item.id)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />

      <View style={styles.itemContent}>
        <Text
          style={[styles.itemTitle, { color: isDark ? '#F9FAFB' : '#1F2937' }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <Text
          style={[
            styles.itemProvider,
            { color: isDark ? '#9CA3AF' : '#6B7280' },
          ]}
          numberOfLines={1}
        >
          by {item.provider}
        </Text>

        <View style={styles.itemDetails}>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
            <Text
              style={[styles.rating, { color: isDark ? '#FCD34D' : '#1F2937' }]}
            >
              {item.rating}
            </Text>
          </View>

          <Text
            style={[
              styles.duration,
              { color: isDark ? '#9CA3AF' : '#6B7280' },
            ]}
          >
            {item.duration}
          </Text>
        </View>

        <View style={styles.itemFooter}>
          <Text style={styles.price}>₹{item.price}</Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.removeButton,
                {
                  backgroundColor: isDark ? '#7F1D1D' : '#FEF2F2',
                },
              ]}
              onPress={() => handleRemoveFromWishlist(item.id)}
              activeOpacity={0.7}
            >
              <Trash2 size={16} color="#EF4444" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddToCart(item)}
              activeOpacity={0.7}
            >
              <Plus size={16} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Heart size={64} color={isDark ? '#4B5563' : '#E5E7EB'} />
      <Text
        style={[
          styles.emptyTitle,
          { color: isDark ? '#F9FAFB' : '#1F2937' },
        ]}
      >
        Your wishlist is empty
      </Text>
      <Text
        style={[
          styles.emptySubtitle,
          { color: isDark ? '#9CA3AF' : '#6B7280' },
        ]}
      >
        Browse services and add them to your wishlist to save for later
      </Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => router.push('/(tabs)')}
        activeOpacity={0.7}
      >
        <Text style={styles.browseButtonText}>Browse Services</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#111827' : '#F9FAFB' },
      ]}
    >
      <LinearGradient
        colors={['#0f2027', '#203a43', '#2c5364']}
        style={styles.headerGradient}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.heyText}>Wishlist</Text>
            <Text style={styles.subText}>Manage Your Favourites!</Text>
          </View>
        </View>
      </LinearGradient>

      {state.wishlist.length > 0 && (
        <Text
          style={[
            styles.itemCount,
            { color: isDark ? '#D1D5DB' : '#6B7280' },
          ]}
        >
          {state.wishlist.length} items
        </Text>
      )}

      <FlatList
        data={state.wishlist}
        renderItem={renderWishlistItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          styles.listContent,
          state.wishlist.length === 0 && styles.emptyListContent,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  subText: { fontSize: 14, color: '#d1d5db', marginTop: 4 },
  itemCount: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  itemImage: {
    width: 100,
    height: 120,
  },
  itemContent: {
    flex: 1,
    padding: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
    lineHeight: 20,
  },
  itemProvider: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  duration: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#2563EB',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 40,
  },
  browseButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  browseButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});
