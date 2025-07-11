
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, CreditCard, MapPin, User, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function CheckoutScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const { state, clearCart, getTotalPrice, getCartItemsCount } = useApp();
  const { state: authState } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = getTotalPrice();
  const itemCount = getCartItemsCount();
  const tax = totalPrice * 0.08;
  const serviceFee = 5.99;
  const finalTotal = totalPrice + tax + serviceFee;

  const handleBack = () => {
    router.back();
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    Alert.alert(
      'Order Placed Successfully!',
      `Your order for ${itemCount} service${itemCount > 1 ? 's' : ''} has been confirmed. Total amount:₹${finalTotal.toFixed(2)}`,
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            router.replace('/(tabs)');
          },
        },
      ]
    );
    setIsProcessing(false);
  };

  const renderOrderItem = (item: any) => (
    <View key={item.service.id} style={[styles.orderItem, isDark && { borderBottomColor: '#444' }]}> 
      <Image source={{ uri: item.service.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={[styles.itemTitle, isDark && { color: '#fff' }]} numberOfLines={2}>{item.service.title}</Text>
        <Text style={[styles.itemProvider, isDark && { color: '#aaa' }]}>by {item.service.provider}</Text>
        <Text style={[styles.itemQuantity, isDark && { color: '#aaa' }]}>Qty: {item.quantity}</Text>
      </View>
      <Text style={[styles.itemPrice, isDark && { color: '#60A5FA' }]}>
        ₹{(item.service.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isDark && { backgroundColor: '#111827' }]}>
      <View style={[styles.header, isDark && { backgroundColor: '#1F2937', borderBottomColor: '#374151' }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
          <ArrowLeft size={24} color={isDark ? '#fff' : '#1F2937'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && { color: '#fff' }]}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && { color: '#fff' }]}>Order Summary</Text>
          <View style={[styles.card, isDark && { backgroundColor: '#1F2937' }]}> 
            {state.cart.map(renderOrderItem)}
          </View>
        </View>

        {/* Delivery Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && { color: '#fff' }]}>Service Address</Text>
          <View style={[styles.card, isDark && { backgroundColor: '#1F2937' }]}> 
            <View style={styles.infoRow}>
              <View style={[styles.infoIcon, isDark && { backgroundColor: '#374151' }]}> 
                <MapPin size={20} color="#2563EB" />
              </View>
              <View style={styles.infoContent}>
                <Text style={[styles.infoTitle, isDark && { color: '#fff' }]}>Service Location</Text>
                <Text style={[styles.infoText, isDark && { color: '#aaa' }]}> 
                  {authState.user?.address || '123 Main Street, City, State 12345'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Customer Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && { color: '#fff' }]}>Customer Information</Text>
          <View style={[styles.card, isDark && { backgroundColor: '#1F2937' }]}> 
            <View style={styles.infoRow}>
              <View style={[styles.infoIcon, isDark && { backgroundColor: '#374151' }]}> 
                <User size={20} color="#2563EB" />
              </View>
              <View style={styles.infoContent}>
                <Text style={[styles.infoTitle, isDark && { color: '#fff' }]}>Contact Details</Text>
                <Text style={[styles.infoText, isDark && { color: '#aaa' }]}>{authState.user?.name}</Text>
                <Text style={[styles.infoText, isDark && { color: '#aaa' }]}>{authState.user?.email}</Text>
                <Text style={[styles.infoText, isDark && { color: '#aaa' }]}>{authState.user?.phone}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && { color: '#fff' }]}>Payment Method</Text>
          <View style={[styles.card, isDark && { backgroundColor: '#1F2937' }]}> 
            <View style={styles.infoRow}>
              <View style={[styles.infoIcon, isDark && { backgroundColor: '#374151' }]}> 
                <CreditCard size={20} color="#2563EB" />
              </View>
              <View style={styles.infoContent}>
                <Text style={[styles.infoTitle, isDark && { color: '#fff' }]}>Cash on Service</Text>
                <Text style={[styles.infoText, isDark && { color: '#aaa' }]}>Pay when service is completed</Text>
              </View>
              <CheckCircle size={24} color="#10B981" />
            </View>
          </View>
        </View>

        {/* Price Breakdown */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && { color: '#fff' }]}>Price Details</Text>
          <View style={[styles.card, isDark && { backgroundColor: '#1F2937' }]}> 
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, isDark && { color: '#aaa' }]}>Subtotal ({itemCount} items)</Text>
              <Text style={[styles.priceValue, isDark && { color: '#fff' }]}>{`₹${totalPrice.toFixed(2)}`}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, isDark && { color: '#aaa' }]}>Service Fee</Text>
              <Text style={[styles.priceValue, isDark && { color: '#fff' }]}>{`₹${serviceFee.toFixed(2)}`}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, isDark && { color: '#aaa' }]}>Tax (8%)</Text>
              <Text style={[styles.priceValue, isDark && { color: '#fff' }]}>{`₹${tax.toFixed(2)}`}</Text>
            </View>
            <View style={[styles.priceRow, styles.totalRow]}>
              <Text style={[styles.totalLabel, isDark && { color: '#fff' }]}>Total Amount</Text>
              <Text style={[styles.totalValue, isDark && { color: '#60A5FA' }]}>{`₹${finalTotal.toFixed(2)}`}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, isDark && { backgroundColor: '#1F2937', borderTopColor: '#374151' }]}> 
        <View style={styles.totalContainer}>
          <Text style={[styles.footerTotalLabel, isDark && { color: '#fff' }]}>Total: ₹{finalTotal.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={[styles.placeOrderButton, isProcessing && styles.placeOrderButtonDisabled]}
          onPress={handlePlaceOrder}
          disabled={isProcessing}
          activeOpacity={0.7}
        >
          <Text style={styles.placeOrderButtonText}>
            {isProcessing ? 'Processing...' : 'Place Order'}
          </Text>
        </TouchableOpacity>
      </View>
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    paddingBottom: 140,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemProvider: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#2563EB',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#EBF4FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  priceValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 8,
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#2563EB',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  footerTotalLabel: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  placeOrderButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  placeOrderButtonDisabled: {
    opacity: 0.6,
  },
  placeOrderButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  }
});
