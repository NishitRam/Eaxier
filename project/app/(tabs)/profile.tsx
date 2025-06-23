import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import {
  Edit3, Camera, LogOut, Calendar, Settings, Bookmark, Star, MapPin,
  User, Gift, Moon, Sun
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';

export default function ProfileScreen() {
  const { state, logout, updateProfile } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    phone: state.user?.phone || '',
    address: state.user?.address || '',
  });

  const handleEditToggle = () => {
    if (isEditing) {
      updateProfile(formData);
    }
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Grant permissions to change your profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      updateProfile({ profileImage: result.assets[0].uri });
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const backgroundColor = isDark ? '#111827' : '#F9FAFB';
  const cardColor = isDark ? '#1F2937' : '#FFFFFF';
  const textColor = isDark ? '#F9FAFB' : '#111827';
  const subTextColor = isDark ? '#9CA3AF' : '#6B7280';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <LinearGradient
            colors={['#0f2027', '#203a43', '#2c5364']}
            style={styles.headerGradient}
          >
            <View style={styles.headerTop}>
              <View>
                <Text style={styles.heyText}>Profile</Text>
                <Text style={styles.subText}>View and edit your account details</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 16 }}>
                <TouchableOpacity onPress={toggleTheme}>
                  {isDark ? <Sun size={20} color="#FBBF24" /> : <Moon size={20} color="#fff" />}
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEditToggle}>
                  <Edit3 size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: state.user?.profileImage || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
            }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraButton} onPress={handleImagePicker}>
            <Camera size={16} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.userInfoBox}>
          <Text style={[styles.userName, { color: textColor }]}>{formData.name || 'Verified Customer'}</Text>
          <Text style={[styles.userPhone, { color: subTextColor }]}>{formData.phone || '+91 7854962134'}</Text>
        </View>

        {isEditing && (
          <View style={styles.editForm}>
            <TextInput
              style={[styles.input, { backgroundColor: cardColor, color: textColor }]}
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(val) => updateFormData('name', val)}
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              style={[styles.input, { backgroundColor: cardColor, color: textColor }]}
              placeholder="Phone Number"
              value={formData.phone}
              keyboardType="phone-pad"
              onChangeText={(val) => updateFormData('phone', val)}
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              style={[styles.input, { height: 80, backgroundColor: cardColor, color: textColor }]}
              placeholder="Address"
              multiline
              numberOfLines={3}
              value={formData.address}
              onChangeText={(val) => updateFormData('address', val)}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        )}

        <View style={styles.rowBoxContainer}>
          <TouchableOpacity style={[styles.rowBox, { backgroundColor: cardColor }]} onPress={() => router.push('/bookings')}>
  <Calendar size={22} color="#2563EB" />
  <Text style={[styles.rowBoxText, { color: textColor }]}>My bookings</Text>
</TouchableOpacity>
          <TouchableOpacity style={[styles.rowBox, { backgroundColor: cardColor }]}>
            <Bookmark size={22} color="#2563EB" />
            <Text style={[styles.rowBoxText, { color: textColor }]}>Native devices</Text>
          </TouchableOpacity>
         <TouchableOpacity style={[styles.rowBox, { backgroundColor: cardColor }]} onPress={() => router.push('/settings')}>
  <Settings size={22} color="#2563EB" />
  <Text style={[styles.rowBoxText, { color: textColor }]}>Settings</Text>
</TouchableOpacity>
        </View>

        <View style={[styles.optionList, { backgroundColor: cardColor }]}>
          <OptionRow icon={Star} label="My Plans" textColor={textColor} />
          <OptionRow icon={Gift} label="Wallet" textColor={textColor} />
          <OptionRow icon={User} label="Plus membership" textColor={textColor} />
          <OptionRow icon={Star} label="My Rating" textColor={textColor} />
          <OptionRow icon={MapPin} label="Manage addresses" textColor={textColor} />
          <OptionRow icon={Gift} label="Manage payment methods" textColor={textColor} />
          <OptionRow icon={Settings} label="Settings" textColor={textColor} />
          <OptionRow icon={Bookmark} label="About UC" textColor={textColor} />
        </View>

        <View style={styles.referCard}>
          <Gift size={24} color="#2563EB" />
          <Text style={styles.referText}>Refer and Earn Rewards</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const OptionRow = ({
  icon: Icon,
  label,
  textColor,
}: {
  icon: any;
  label: string;
  textColor: string;
}) => (
  <TouchableOpacity style={styles.optionRow}>
    <Icon size={20} color="#2563EB" />
    <Text style={[styles.optionText, { color: textColor }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  header: {},
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
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  profileImage: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E5E7EB' },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: '40%',
    backgroundColor: '#2563EB',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  userInfoBox: {
    alignItems: 'center',
    marginBottom: 10,
  },
  userName: { fontSize: 20, fontWeight: 'bold' },
  userPhone: { fontSize: 14, marginTop: 2 },
  editForm: { paddingHorizontal: 20 },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  rowBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  rowBox: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    width: '30%',
    elevation: 2,
    shadowColor: '#00000020',
  },
  rowBoxText: { fontSize: 12, marginTop: 6, textAlign: 'center' },
  optionList: {
    marginVertical: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionText: { marginLeft: 12, fontSize: 16 },
  referCard: {
    margin: 20,
    backgroundColor: '#E0F2FE',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  referText: { fontSize: 16, color: '#2563EB', fontWeight: '600' },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: { fontSize: 16, marginLeft: 10, color: '#EF4444', fontWeight: '600' },
});
