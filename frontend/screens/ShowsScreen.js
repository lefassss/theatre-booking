import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { getShows } from '../components/api';

export default function ShowsScreen({ navigation, route }) {
  const { theatreId, theatreName } = route.params;
  const [shows, setShows] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getShows(theatreId)
      .then(res => setShows(res.data))
      .catch(() => alert('Δεν ήταν δυνατή η φόρτωση παραστάσεων'));
  }, []);

  const filtered = shows.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    (s.description && s.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 {theatreName}</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Αναζήτηση παράστασης..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.show_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Showtimes', { showId: item.show_id, showTitle: item.title })}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>⏱ {item.duration} λεπτά | 🔞 {item.age_rating}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Δεν βρέθηκαν παραστάσεις</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  searchInput: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 15, fontSize: 15, backgroundColor: '#fff' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#6200ea' },
  cardSubtitle: { fontSize: 14, color: '#666', marginTop: 5 },
  cardDesc: { fontSize: 13, color: '#999', marginTop: 5 },
  empty: { textAlign: 'center', color: '#999', fontSize: 16, marginTop: 30 },
});