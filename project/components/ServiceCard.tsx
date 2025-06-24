import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Star, Heart, Plus, Clock, Award } from 'lucide-react-native';
import { Service } from '@/types';
import { useApp } from '@/context/AppContext';

interface ServiceCardProps {
  service: Service;
  featured?: boolean;
}

const { width } = Dimensions.get('window');

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, featured = false }) => {
  const router = useRouter();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  const isWishlisted = isInWishlist(service.id);

  const handlePress = () => {
    router.push(`/service/${service.id}`);
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(service.id);
    } else {
      addToWishlist(service);
    }
  };

  const handleAddToCart = () => {
    addToCart(service);
  };

  if (featured) {
    return (
      <TouchableOpacity style={styles.featuredContainer} onPress={handlePress} activeOpacity={0.9}>
        <LinearGradient
          colors={['#2563eb', '#4f46e5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.featuredGradient}
        >
          <View style={styles.featuredImageContainer}>
            <Image source={{ uri: service.image }} style={styles.featuredImage} />
            <View style={styles.featuredBadge}>
              <Award size={12} color="#FFFFFF" />
              <Text style={styles.featuredBadgeText}>Featured</Text>
            </View>
            <TouchableOpacity
              style={styles.featuredWishlistButton}
              onPress={handleWishlistToggle}
              activeOpacity={0.8}
            >
              <Heart
                size={18}
                color={isWishlisted ? '#FF6B6B' : '#FFFFFF'}
                fill={isWishlisted ? '#FF6B6B' : 'transparent'}
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.featuredContent}>
            <Text style={styles.featuredTitle} numberOfLines={2}>
              {service.title}
            </Text>
            
            <Text style={styles.featuredProvider} numberOfLines={1}>
              by {service.provider}
            </Text>
            
            <View style={styles.featuredDetails}>
              <View style={styles.featuredRating}>
                <Star size={12} color="#FFD700" fill="#FFD700" />
                <Text style={styles.featuredRatingText}>{service.rating}</Text>
              </View>
              
              <View style={styles.featuredDuration}>
                <Clock size={12} color="rgba(255, 255, 255, 0.8)" />
                <Text style={styles.featuredDurationText}>{service.duration}</Text>
              </View>
            </View>
            
            <View style={styles.featuredFooter}>
              <Text style={styles.featuredPrice}>₹{service.price}</Text>
              <TouchableOpacity
                style={styles.featuredAddButton}
                onPress={handleAddToCart}
                activeOpacity={0.8}
              >
                <Plus size={14} color="#667eea" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.9}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: service.image }} style={styles.image} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)']}
            style={styles.imageOverlay}
          />
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={handleWishlistToggle}
            activeOpacity={0.8}
          >
            <Heart
              size={18}
              color={isWishlisted ? '#FF6B6B' : '#FFFFFF'}
              fill={isWishlisted ? '#FF6B6B' : 'transparent'}
            />
          </TouchableOpacity>
          {service.rating >= 4.8 && (
            <View style={styles.topRatedBadge}>
              <Star size={10} color="#FFFFFF" fill="#FFFFFF" />
              <Text style={styles.topRatedText}>Top Rated</Text>
            </View>
          )}
        </View>
        
        <View style={styles.content}>
          <Text style={styles.category}>{service.category}</Text>
          
          <Text style={styles.title} numberOfLines={2}>
            {service.title}
          </Text>
          
          <Text style={styles.provider} numberOfLines={1}>
            by {service.provider}
          </Text>
          
          <View style={styles.details}>
            <View style={styles.ratingContainer}>
              <Star size={12} color="#FFD700" fill="#FFD700" />
              <Text style={styles.rating}>{service.rating}</Text>
            </View>
            
            <View style={styles.durationContainer}>
              <Clock size={12} color="#9CA3AF" />
              <Text style={styles.duration}>{service.duration}</Text>
            </View>
          </View>
          
          <View style={styles.footer}>
            <View>
              <Text style={styles.priceLabel}>Starting at</Text>
              <Text style={styles.price}>₹{service.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddToCart}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#2563eb', '#4f46e5']}
                style={styles.addButtonGradient}
              >
                <Plus size={16} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  wishlistButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRatedBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRatedText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  content: {
    padding: 20,
  },
  category: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#667eea',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 6,
    lineHeight: 24,
  },
  provider: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginLeft: 4,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginBottom: 2,
  },
  price: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  addButton: {
    borderRadius: 20,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Featured styles
  featuredContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  featuredGradient: {
    padding: 4,
  },
  featuredImageContainer: {
    position: 'relative',
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  featuredWishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 20,
  },
  featuredProvider: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  featuredDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featuredRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  featuredRatingText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  featuredDuration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredDurationText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredPrice: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  featuredAddButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});