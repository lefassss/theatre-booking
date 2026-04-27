import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getShows } from '../components/api';

export default function ShowsScreen({ navigation, route }) {
  const { theatreId, theatreName } = route.params;
  const [shows, setShows] = useState([]);

  useEffect(() => {
    getShows(theatreId)
      .then(res => setShows(res.data))
      .catch(() => Alert.alert('Σφάλμα', 'Δεν ήταν δυνατή η φόρτωση παραστάσεων'));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 {theatreName}</Text>
      <FlatList
        data={shows}
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#6200ea' },
  cardSubtitle: { fontSize: 14, color: '#666', marginTop: 5 },
  cardDesc: { fontSize: 13, color: '#999', marginTop: 5 },
});