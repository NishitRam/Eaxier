import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OffersScreen = () => {
  const offers = [
    {
      title: '💅 Beauty Services at Home',
      description: 'Flat 20% off on first booking!',
    },
    {
      title: '🧹 Home Cleaning Combo',
      description: 'Save ₹300 on kitchen + bathroom package.',
    },
    {
      title: '🔧 AC Service Offer',
      description: '₹199 AC servicing - Limited Time!',
    },
    {
      title: '📦 Appliance Repair Deal',
      description: 'Flat ₹100 off on all repairs.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🎁 Welcome Back!</Text>
      <Text style={styles.subtext}>Check out your exclusive Urban Company offers</Text>

      <ScrollView contentContainerStyle={styles.offerList}>
        {offers.map((offer, index) => (
          <View key={index} style={styles.offerCard}>
            <Text style={styles.offerTitle}>{offer.title}</Text>
            <Text style={styles.offerDescription}>{offer.description}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          // this will work if the screen is part of a stack
          // if you're in a tab, use navigation.navigate('TabName')
          // or adjust accordingly
          // @ts-ignore
          navigation.goBack();
        }}
      >
        <Text style={styles.backBtnText}>← Back to Games</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OffersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 6,
  },
  subtext: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 20,
  },
  offerList: {
    paddingBottom: 60,
  },
  offerCard: {
    backgroundColor: '#e0f2fe',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0c4a6e',
  },
  offerDescription: {
    fontSize: 14,
    color: '#334155',
    marginTop: 4,
  },
  backBtn: {
    marginTop: 20,
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backBtnText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
