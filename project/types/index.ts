
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  profileImage?: string;
  address?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

export interface Service {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  provider: string;
  duration: string;
  tags: string[];
}

export interface CartItem {
  service: Service;
  quantity: number;
  selectedDate?: string;
  selectedTime?: string;
}

export interface AppState {
  cart: CartItem[];
  wishlist: Service[];
  services: Service[];
  isLoading: boolean;
  searchQuery: string;
  selectedCategory: string;
}

export type AppAction =
  | { type: 'SET_SERVICES'; payload: Service[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_TO_CART'; payload: Service }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Service }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string };

export type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE'; payload: Partial<User> }
  | { type: 'SET_LOADING'; payload: boolean };