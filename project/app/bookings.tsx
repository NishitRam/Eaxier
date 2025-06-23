import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Check, X, MapPin, Trash2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const sampleBookings = [
  {
    id: '1',
    title: 'AC Repair Service',
    description: 'Technician visit scheduled for 3:00 PM today.',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Haircut at Home',
    description: 'Appointment confirmed for tomorrow at 4:00 PM.',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Plumbing Service',
    description: 'Appointment confirmed for tomorrow at 12:00 PM.',
    status: 'pending',
  },
  {
    id: '4',
    title: 'Massage Therapy',
    description: 'Appointment confirmed for tomorrow at 10:00 AM.',
    status: 'pending',
  },
  {
    id: '5',
    title: 'Electrical Repair',
    description: 'Appointment confirmed for tomorrow at 9:00 AM.',
    status: 'pending',
  },
];

export default function BookingsScreen() {
  const navigation = useNavigation();
  const [bookings, setBookings] = useState(sampleBookings);
  const [trackingId, setTrackingId] = useState<string | null>(null);

  const updateStatus = (id: string, newStatus: 'done' | 'cancelled') => {
    setBookings(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const removeBooking = (id: string) => {
    setBookings(prev => prev.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <LinearGradient
            colors={['#0f2027', '#203a43', '#2c5364']}
            style={styles.headerGradient}
          >
            <View style={styles.headerTop}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft size={20} color="#fff" />
              </TouchableOpacity>
              <View>
                <Text style={styles.heyText}>My Bookings</Text>
                <Text style={styles.subText}>Manage your placed services</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {bookings.map((item) => (
          <View key={item.id} style={styles.bookingCard}>
            <Text style={styles.serviceTitle}>{item.title}</Text>
            <Text style={styles.serviceDescription}>{item.description}</Text>

            {item.status === 'pending' && (
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => updateStatus(item.id, 'done')} style={styles.doneButton}>
                  <Check size={16} color="#fff" />
                  <Text style={styles.actionText}>Done</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => updateStatus(item.id, 'cancelled')} style={styles.cancelButton}>
                  <X size={16} color="#fff" />
                  <Text style={styles.actionText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setTrackingId(prev => prev === item.id ? null : item.id)} style={styles.trackButton}>
                  <MapPin size={16} color="#fff" />
                  <Text style={styles.actionText}>Track</Text>
                </TouchableOpacity>
              </View>
            )}

            {item.status === 'done' && (
              <View style={styles.statusRow}>
                <Text style={styles.doneLabel}>✅ Marked as Done</Text>
                <TouchableOpacity onPress={() => removeBooking(item.id)} style={styles.removeBtn}>
                  <Trash2 size={16} color="#fff" />
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}

            {item.status === 'cancelled' && (
              <View style={styles.statusRow}>
                <Text style={styles.cancelledLabel}>❌ Cancelled</Text>
                <TouchableOpacity onPress={() => removeBooking(item.id)} style={styles.removeBtn}>
                  <Trash2 size={16} color="#fff" />
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}

            {trackingId === item.id && (
              <View style={styles.trackingBox}>
                <Text style={styles.trackHeader}>Order Status:</Text>
                <Text style={styles.trackStatus}>🚚 Your technician is on the way.</Text>
                <Text style={styles.trackEta}>ETA: 25 mins</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scrollContent: { paddingBottom: 40, paddingHorizontal: 16 },
  header: {},
  headerGradient: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 16,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  heyText: { fontSize: 18, color: '#fff', fontWeight: '600' },
  subText: { fontSize: 14, color: '#d1d5db', marginTop: 2 },

  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  serviceTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  serviceDescription: { fontSize: 14, color: '#6B7280' },

  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  doneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22c55e',
    padding: 8,
    borderRadius: 8,
    gap: 4,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    padding: 8,
    borderRadius: 8,
    gap: 4,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    padding: 8,
    borderRadius: 8,
    gap: 4,
  },
  actionText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  trackingBox: {
    backgroundColor: '#E0F2FE',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  trackHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  trackStatus: {
    fontSize: 13,
    color: '#2563EB',
  },
  trackEta: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#F1F5F9',
    padding: 10,
    borderRadius: 8,
  },
  doneLabel: {
    color: '#16a34a',
    fontWeight: '600',
  },
  cancelledLabel: {
    color: '#b91c1c',
    fontWeight: '600',
  },
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6b7280',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  removeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});
