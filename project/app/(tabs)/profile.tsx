import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import {
  Edit3, Camera, LogOut, Calendar, Settings, Bookmark, Star, MapPin,
  Phone, User, Gift
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const { state, logout, updateProfile } = useAuth();
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Header */}
        <View style={styles.topSection}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{formData.name || 'Verified Customer'}</Text>
            <Text style={styles.userPhone}>{formData.phone || '+91 7854962134'}</Text>
          </View>
          <TouchableOpacity onPress={handleEditToggle}>
            <Edit3 size={20} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {/* Image */}
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

        {/* Editable Form */}
        {isEditing && (
          <View style={styles.editForm}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(val) => updateFormData('name', val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formData.phone}
              keyboardType="phone-pad"
              onChangeText={(val) => updateFormData('phone', val)}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Address"
              multiline
              numberOfLines={3}
              value={formData.address}
              onChangeText={(val) => updateFormData('address', val)}
            />
          </View>
        )}

        {/* Top Action Boxes */}
        <View style={styles.rowBoxContainer}>
          <TouchableOpacity style={styles.rowBox}>
            <Calendar size={22} color="#2563EB" />
            <Text style={styles.rowBoxText}>My bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowBox}>
            <Bookmark size={22} color="#2563EB" />
            <Text style={styles.rowBoxText}>Native devices</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowBox}>
            <Settings size={22} color="#2563EB" />
            <Text style={styles.rowBoxText}>Help & support</Text>
          </TouchableOpacity>
        </View>

        {/* Other Options */}
        <View style={styles.optionList}>
          <OptionRow icon={Star} label="My Plans" />
          <OptionRow icon={Gift} label="Wallet" />
          <OptionRow icon={User} label="Plus membership" />
          <OptionRow icon={Star} label="My Rating" />
          <OptionRow icon={MapPin} label="Manage addresses" />
          <OptionRow icon={Gift} label="Manage payment methods" />
          <OptionRow icon={Settings} label="Settings" />
          <OptionRow icon={Bookmark} label="About UC" />
        </View>

        {/* Refer & Earn */}
        <View style={styles.referCard}>
          <Gift size={24} color="#2563EB" />
          <Text style={styles.referText}>Refer and Earn Rewards</Text>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const OptionRow = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <TouchableOpacity style={styles.optionRow}>
    <Icon size={20} color="#2563EB" />
    <Text style={styles.optionText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scrollContent: { paddingBottom: 40 },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  userInfo: {},
  userName: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  userPhone: { fontSize: 14, color: '#6B7280', marginTop: 2 },
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
  editForm: { paddingHorizontal: 20 },
  input: {
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    width: '30%',
    elevation: 2,
    shadowColor: '#00000020',
  },
  rowBoxText: { fontSize: 12, color: '#1F2937', marginTop: 6, textAlign: 'center' },
  optionList: {
    backgroundColor: '#FFFFFF',
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
  optionText: { marginLeft: 12, fontSize: 16, color: '#374151' },
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
