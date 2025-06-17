import { Tabs } from 'expo-router';
import { Chrome as Home, User, ShoppingCart, Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthGuard } from '@/components/AuthGuard';
import { useApp } from '@/context/AppContext';
import { View, Text, StyleSheet } from 'react-native';

function TabBarBadge({ count }: { count: number }) {
  if (count === 0) return null;
  
  return (
    <View style={styles.badge}>
      <LinearGradient
        colors={['#FF6B6B', '#FF8E8E']}
        style={styles.badgeGradient}
      >
        <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
      </LinearGradient>
    </View>
  );
}

export default function TabLayout() {
  const { getCartItemsCount } = useApp();
  const cartCount = getCartItemsCount();

  return (
    <AuthGuard>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#667eea',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0,
            height: 88,
            paddingBottom: 20,
            paddingTop: 8,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Inter-SemiBold',
            marginTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="wishlist"
          options={{
            title: 'Wishlist',
            tabBarIcon: ({ size, color }) => <Heart size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
            tabBarIcon: ({ size, color }) => (
              <View>
                <ShoppingCart size={size} color={color} />
                <TabBarBadge count={cartCount} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -8,
    top: -8,
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  badgeGradient: {
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
});