import { Tabs } from 'expo-router';
import { User, ShoppingCart, Heart, Telescope } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthGuard } from '@/components/AuthGuard';
import { useApp } from '@/context/AppContext';
import { View, Text, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

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
            position: 'absolute',
            left: 20,
            right: 20,
            height: 50,
            backgroundColor: '#000',
            borderRadius: 40,
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 0,
            paddingTop: 0,
          },
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ size, focused }) => (
              <AntDesign
                name="home"
                size={size}
                color={focused ? '#667eea' : '#9CA3AF'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            tabBarIcon: ({ size, color }) => <Telescope size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="wishlist"
          options={{
            tabBarIcon: ({ size, color }) => <Heart size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
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
            tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
          }}
        />
       
      </Tabs>
    </AuthGuard>
  );
}

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
