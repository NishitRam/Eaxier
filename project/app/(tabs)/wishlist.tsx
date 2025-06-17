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
import { Service } from '@/types';
import { Heart, Star, Plus, Trash2 } from 'lucide-react-native';

export default function WishlistScreen() {
  const { state, addToCart, removeFromWishlist } = useApp();
  const router = useRouter();

  const handleServicePress = (serviceId: number) => {
    router.push(`/service/${serviceId}`);
  };

  const handleAddToCart = (service: Service) => {
    addToCart(service);
  };

  const handleRemoveFromWishlist = (serviceId: number) => {
    removeFromWishlist(serviceId);
  };

  const renderWishlistItem = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleServicePress(item.id)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        
        <Text style={styles.itemProvider} numberOfLines={1}>
          by {item.provider}
        </Text>
        
        <View style={styles.itemDetails}>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
          
          <Text style={styles.duration}>{item.duration}</Text>
        </View>
        
        <View style={styles.itemFooter}>
          <Text style={styles.price}>${item.price}</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.removeButton}
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
      <Heart size={64} color="#E5E7EB" />
      <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
      <Text style={styles.emptySubtitle}>
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wishlist</Text>
        {state.wishlist.length > 0 && (
          <Text style={styles.itemCount}>{state.wishlist.length} items</Text>
        )}
      </View>

      <FlatList
        data={state.wishlist}
        renderItem={renderWishlistItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          styles.listContent,
          state.wishlist.length === 0 && styles.emptyListContent
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  itemCount: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
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
    backgroundColor: '#FFFFFF',
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
    color: '#1F2937',
    marginBottom: 4,
    lineHeight: 20,
  },
  itemProvider: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
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
    color: '#1F2937',
    marginLeft: 4,
  },
  duration: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
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
    backgroundColor: '#FEF2F2',
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
    color: '#1F2937',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
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