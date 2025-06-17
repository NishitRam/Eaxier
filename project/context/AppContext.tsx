import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, AppAction, Service } from '@/types';

const initialState: AppState = {
  cart: [],
  wishlist: [],
  services: [],
  isLoading: false,
  searchQuery: '',
  selectedCategory: 'All',
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_SERVICES':
      return { ...state, services: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'ADD_TO_CART':
      const existingCartItem = state.cart.find(item => item.service.id === action.payload.id);
      if (existingCartItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.service.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { service: action.payload, quantity: 1 }],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.service.id !== action.payload),
      };
    case 'UPDATE_CART_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(item => item.service.id !== action.payload.id),
        };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.service.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'ADD_TO_WISHLIST':
      const isInWishlist = state.wishlist.some(item => item.id === action.payload.id);
      if (isInWishlist) return state;
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload),
      };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  addToCart: (service: Service) => void;
  removeFromCart: (serviceId: number) => void;
  updateCartQuantity: (serviceId: number, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (service: Service) => void;
  removeFromWishlist: (serviceId: number) => void;
  isInWishlist: (serviceId: number) => boolean;
  getTotalPrice: () => number;
  getCartItemsCount: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Mock services data
      const mockServices: Service[] = [
        {
          id: 1,
          title: 'AC Repair & Service',
          category: 'Appliance',
          price: 199,
          rating: 4.8,
          image: 'https://images.pexels.com/photos/5691588/pexels-photo-5691588.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Professional AC repair and maintenance service. Our certified technicians will diagnose and fix any AC issues.',
          provider: 'CoolTech Services',
          duration: '60-90 mins',
          tags: ['AC', 'Repair', 'Maintenance', 'Cooling']
        },
        {
          id: 2,
          title: 'House Cleaning',
          category: 'Cleaning',
          price: 89,
          rating: 4.9,
          image: 'https://images.pexels.com/photos/4239019/pexels-photo-4239019.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Deep cleaning service for your home. We cover all rooms, kitchen, bathrooms, and common areas.',
          provider: 'SparkleClean',
          duration: '2-3 hours',
          tags: ['Cleaning', 'Deep Clean', 'Home', 'Sanitization']
        },
        {
          id: 3,
          title: 'Plumbing Service',
          category: 'Home Repair',
          price: 149,
          rating: 4.7,
          image: 'https://images.pexels.com/photos/8985457/pexels-photo-8985457.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Expert plumbing services for leaks, clogs, and installations. 24/7 emergency service available.',
          provider: 'FlowMaster Plumbing',
          duration: '45-120 mins',
          tags: ['Plumbing', 'Repair', 'Installation', 'Emergency']
        },
        {
          id: 4,
          title: 'Massage Therapy',
          category: 'Beauty & Wellness',
          price: 120,
          rating: 4.9,
          image: 'https://images.pexels.com/photos/3997743/pexels-photo-3997743.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Relaxing full-body massage therapy session. Choose from Swedish, deep tissue, or aromatherapy.',
          provider: 'Zen Wellness',
          duration: '60 mins',
          tags: ['Massage', 'Wellness', 'Relaxation', 'Therapy']
        },
        {
          id: 5,
          title: 'Hair Cut & Styling',
          category: 'Beauty & Wellness',
          price: 45,
          rating: 4.6,
          image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Professional haircut and styling service at your doorstep. Includes wash, cut, and styling.',
          provider: 'StyleCraft Salon',
          duration: '45 mins',
          tags: ['Haircut', 'Styling', 'Beauty', 'Grooming']
        },
        {
          id: 6,
          title: 'Electrical Repair',
          category: 'Home Repair',
          price: 179,
          rating: 4.8,
          image: 'https://images.pexels.com/photos/5974042/pexels-photo-5974042.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Licensed electrician for all electrical repairs and installations. Safe and reliable service.',
          provider: 'PowerPro Electric',
          duration: '60-90 mins',
          tags: ['Electrical', 'Repair', 'Installation', 'Wiring']
        },
        {
          id: 7,
          title: 'Pest Control',
          category: 'Home Maintenance',
          price: 129,
          rating: 4.5,
          image: 'https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Safe and effective pest control treatment for your home. Eco-friendly options available.',
          provider: 'BugBuster Pro',
          duration: '90 mins',
          tags: ['Pest Control', 'Treatment', 'Eco-friendly', 'Home']
        },
        {
          id: 8,
          title: 'Personal Trainer',
          category: 'Fitness',
          price: 85,
          rating: 4.7,
          image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Certified personal trainer for customized fitness sessions. Equipment provided.',
          provider: 'FitLife Training',
          duration: '60 mins',
          tags: ['Fitness', 'Training', 'Health', 'Personal']
        }
      ];
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      dispatch({ type: 'SET_SERVICES', payload: mockServices });
    } catch (error) {
      console.error('Failed to load services:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToCart = (service: Service) => {
    dispatch({ type: 'ADD_TO_CART', payload: service });
  };

  const removeFromCart = (serviceId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: serviceId });
  };

  const updateCartQuantity = (serviceId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: serviceId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addToWishlist = (service: Service) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: service });
  };

  const removeFromWishlist = (serviceId: number) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: serviceId });
  };

  const isInWishlist = (serviceId: number) => {
    return state.wishlist.some(item => item.id === serviceId);
  };

  const getTotalPrice = () => {
    return state.cart.reduce((total, item) => total + (item.service.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      getTotalPrice,
      getCartItemsCount,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};