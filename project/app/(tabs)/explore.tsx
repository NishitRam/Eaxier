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
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';

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
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [score, setScore] = useState(70);
  const [showOffers, setShowOffers] = useState(false);

  const handleGameClick = (game: Game) => {
    setScore((prev) => prev + Math.floor(Math.random() * 10 + 1));
    Linking.openURL(game.url);
  };

  const filteredGames = games.filter((g) =>
    g.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#111827' : '#f9fafb' }]}>
      <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.headerGradient}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.heyText}>Explore More</Text>
            <Text style={styles.subText}>Find more services!</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={[styles.searchContainer, { backgroundColor: isDark ? '#374151' : '#e5e7eb' }]}>
        <Search color={isDark ? '#d1d5db' : '#555'} size={20} />
        <TextInput
          style={[styles.searchInput, { color: isDark ? '#f9fafb' : '#111827' }]}
          placeholder="Search games..."
          placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea}>
        <View style={styles.grid}>
          {filteredGames.map((game) => (
            <TouchableOpacity
              key={game.id}
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  shadowColor: isDark ? '#000' : '#000',
                },
              ]}
              onPress={() => handleGameClick(game)}
            >
              <Image source={{ uri: game.image }} style={styles.gameImage} />
              <Text style={[styles.gameTitle, { color: isDark ? '#f3f4f6' : '#374151' }]}>
                {game.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={[
            styles.rewardsSection,
            {
              backgroundColor: isDark ? '#1e293b' : '#e0f2fe',
            },
          ]}
        >
          <Text style={[styles.rewardsTitle, { color: isDark ? '#38bdf8' : '#0284c7' }]}>
            🎁 Rewards & Offers
          </Text>
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
                <View
                  key={index}
                  style={[
                    styles.offerCard,
                    {
                      backgroundColor: isDark ? '#334155' : '#ffffff',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.offerTitle,
                      { color: isDark ? '#facc15' : '#0c4a6e' },
                    ]}
                  >
                    {offer.title}
                  </Text>
                  <Text
                    style={[
                      styles.offerDescription,
                      { color: isDark ? '#f3f4f6' : '#334155' },
                    ]}
                  >
                    {offer.description}
                  </Text>
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
  container: { flex: 1 },
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
  searchContainer: {
    flexDirection: 'row',
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
    width: width * 0.42,
    marginBottom: 16,
    borderRadius: 16,
    alignItems: 'center',
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  gameImage: { width: 72, height: 72, marginBottom: 10 },
  gameTitle: { fontSize: 15, fontWeight: '600', textAlign: 'center' },
  rewardsSection: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: '700',
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
  },
  offerDescription: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default ExploreGamesScreen;
