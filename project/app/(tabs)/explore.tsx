import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';

interface Game {
  id: string;
  title: string;
  image: string;
  url: string;
}

const games: Game[] = [
  { id: '1', title: 'candycrush', image: 'https://s.yimg.com/pv/games/images/SweetGummyBlast_600x400.png', url: 'https://play.google.com/store/apps/details?id=com.king.candycrushsaga&hl=en-us' },
  { id: '2', title: 'Quick Math', image: 'https://tse2.mm.bing.net/th?id=OIP.UWR7sD_3Avg5pOX8QNuDzwHaHa&pid=Api&P=0&h=180', url: 'https://in.mathgames.com/' },
  { id: '3', title: '2048', image: 'https://s.yimg.com/cv/apiv2/games/images/2048Zen_600x400__2_.png', url: 'https://play2048.co/' },
  { id: '4', title: 'Wordle', image: 'https://tse1.mm.bing.net/th?id=OIP.LV_G9qcEcwMhNJCq04FMCQHaEJ&pid=Api&P=0&h=180', url: 'https://powerlanguage-wordle.github.io/' },
  { id: '5', title: 'RataType', image: 'https://www.ratatype.com/static/img/typing-race/heroes.png', url: 'https://www.ratatype.com/typing-games/race/' },
  { id: '6', title: 'Reaction Test', image: 'https://tse1.mm.bing.net/th?id=OIP.F4-2OpK3WVsUX4N9qw9-TgHaEK&pid=Api&P=0&h=180', url: 'https://humanbenchmark.com/tests/reactiontime' },
  { id: '7', title: 'Sudoku', image: 'https://s.yimg.com/pv/games/images/Sudoku_1_600x399.png', url: 'https://esudoku.in/' },
  { id: '8', title: 'Chess', image: 'https://s.aolcdn.com/aoldotcom-releases/games/masque/Chess_600x400.png', url: 'https://www.mathsisfun.com/games/chess.html' },
  { id: '9', title: 'Ludo', image: 'https://www.gametion.com/img/banners/Creative_Ludo_King_01.png', url: 'https://www.gametion.com/ludoking.html' },
  { id: '10', title: 'Tic-Tac-Toe', image: 'https://tse1.mm.bing.net/th?id=OIP.HoRmgXA8R0mSq2loS85WLwHaHa&pid=Api&P=0&h=180', url: 'https://playtictactoe.org/' },
];

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

const ExploreGamesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [score, setScore] = useState(70);
  const [showOffers, setShowOffers] = useState(false);

  const handleGameClick = (game: Game) => {
    setScore(prev => prev + Math.floor(Math.random() * 10 + 1));
    Linking.openURL(game.url);
  };

  const filteredGames = games.filter((g) =>
    g.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎮 Play Games & Earn!</Text>
        <Text style={styles.subtitle}>Score: {score} | Level: {Math.floor(score / 50) + 1}</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search color="#555" size={20} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search games..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea}>
        <View style={styles.grid}>
          {filteredGames.map((game) => (
            <TouchableOpacity
              key={game.id}
              style={styles.card}
              onPress={() => handleGameClick(game)}
            >
              <Image source={{ uri: game.image }} style={styles.gameImage} />
              <Text style={styles.gameTitle}>{game.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.rewardsSection}>
          <Text style={styles.rewardsTitle}>🎁 Rewards & Offers</Text>
          <TouchableOpacity
            style={styles.rewardsButton}
            onPress={() => setShowOffers(!showOffers)}
          >
            <Text style={styles.rewardsButtonText}>
              {showOffers ? 'Hide Offers' : 'View Offers'}
            </Text>
          </TouchableOpacity>

          {showOffers && (
            <View style={styles.offerList}>
              {offers.map((offer, index) => (
                <View key={index} style={styles.offerCard}>
                  <Text style={styles.offerTitle}>{offer.title}</Text>
                  <Text style={styles.offerDescription}>{offer.description}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { padding: 20, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', color: '#1f2937' },
  subtitle: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    alignItems: 'center',
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  scrollArea: {
    paddingBottom: 100,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#ffffff',
    width: width * 0.42,
    marginBottom: 16,
    borderRadius: 16,
    alignItems: 'center',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  gameImage: { width: 72, height: 72, marginBottom: 10 },
  gameTitle: { fontSize: 15, fontWeight: '600', color: '#374151', textAlign: 'center' },
  rewardsSection: {
    width: '100%',
    padding: 20,
    backgroundColor: '#e0f2fe',
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0284c7',
    marginBottom: 12,
  },
  rewardsButton: {
    backgroundColor: '#0284c7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  rewardsButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  offerList: {
    width: '100%',
  },
  offerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0c4a6e',
  },
  offerDescription: {
    fontSize: 14,
    color: '#334155',
    marginTop: 4,
  },
});

export default ExploreGamesScreen;
