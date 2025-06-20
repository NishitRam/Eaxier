import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useApp } from '@/context/AppContext';
import { CartItem } from '@/types';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CartScreen() {
  const { state, removeFromCart, updateCartQuantity, clearCart, getTotalPrice } = useApp();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleQuantityChange = (serviceId, change) => {
    const item = state.cart.find(item => item.service.id === serviceId);
    if (item) {
      const newQuantity = item.quantity + change;
      updateCartQuantity(serviceId, newQuantity);
    }
  };

  const handleRemoveItem = (serviceId) => {
    removeFromCart(serviceId);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.service.image }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle} numberOfLines={2}>{item.service.title}</Text>
        <Text style={styles.itemProvider} numberOfLines={1}>by {item.service.provider}</Text>
        <Text style={styles.itemDuration}>{item.service.duration}</Text>
        <View style={styles.itemFooter}>
          <Text style={styles.itemPrice}>${item.service.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.service.id, -1)}>
              <Minus size={16} color="#6B7280" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.service.id, 1)}>
              <Plus size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveItem(item.service.id)}>
            <Trash2 size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <ShoppingCart size={64} color="#E5E7EB" />
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptySubtitle}>Add services to your cart to get started</Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => router.push('/(tabs)')}>
        <Text style={styles.browseButtonText}>Browse Services</Text>
      </TouchableOpacity>
    </View>
  );

  const totalPrice = getTotalPrice();
  const itemCount = state.cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      
      <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.headerGradient}>
        <View style={styles.headerTop}>
          <Text style={styles.heyText}>Cart</Text>
          <Text style={styles.subText}>Manage Your Orders Here</Text>
        </View>
      </LinearGradient>

      {state.cart.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearCart}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      )}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          data={state.cart}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.service.id.toString()}
          contentContainerStyle={[
            styles.listContent,
            state.cart.length === 0 && styles.emptyListContent,
            { paddingBottom: 140 + insets.bottom },
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
        />

        {state.cart.length > 0 && (
          <View style={[styles.footerOverlay, { bottom: insets.bottom + 16 }]}>
            <View style={styles.footerCard}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>{itemCount} items</Text>
                <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={handleCheckout}>
                <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerGradient: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 16,
  },
  headerTop: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  heyText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700'
  },
  subText: {
    fontSize: 14,
    color: '#d1d5db',
    marginTop: 4,
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
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
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  itemImage: {
    width: 100,
    height: 140,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  itemContent: {
    flex: 1,
    padding: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemProvider: {
    fontSize: 14,
    color: '#6B7280',
  },
  itemDuration: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563EB',
  },
  quantityContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 4,
    alignItems: 'center'
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    color: '#1F2937',
    marginHorizontal: 8,
    textAlign: 'center'
  },
  removeButton: {
    width: 36,
    height: 36,
    backgroundColor: '#FEF2F2',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginVertical: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  browseButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  footerOverlay: {
    position: 'absolute',
    left: 16,
    right: 16,
    paddingBottom:25,
  },
  footerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  checkoutButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
