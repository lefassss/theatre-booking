import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getShowtimes, createReservation } from '../components/api';

export default function ShowtimesScreen({ navigation, route }) {
  const { showId, showTitle } = route.params;
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    getShowtimes(showId)
      .then(res => setShowtimes(res.data))
      .catch(() => Alert.alert('Σφάλμα', 'Δεν ήταν δυνατή η φόρτωση ωραρίων'));
  }, []);

  const handleReservation = async (showtime_id) => {
    try {
      await createReservation(showtime_id, 1);
      Alert.alert('Επιτυχία!', 'Η κράτηση ολοκληρώθηκε!');
      navigation.navigate('Reservations');
    } catch (err) {
      Alert.alert('Σφάλμα', 'Δεν ήταν δυνατή η κράτηση');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕐 {showTitle}</Text>
      <FlatList
        data={showtimes}
        keyExtractor={(item) => item.showtime_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📅 {item.show_date} | 🕐 {item.show_time}</Text>
            <Text style={styles.cardSubtitle}>💺 Διαθέσιμες θέσεις: {item.available_seats}</Text>
            <Text style={styles.cardPrice}>💶 {item.price}€</Text>
            <TouchableOpacity
              style={[styles.button, item.available_seats === 0 && styles.buttonDisabled]}
              onPress={() => handleReservation(item.showtime_id)}
              disabled={item.available_seats === 0}
            >
              <Text style={styles.buttonText}>
                {item.available_seats === 0 ? 'Πλήρες' : 'Κράτηση'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, elevation: 3 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardSubtitle: { fontSize: 14, color: '#666', marginTop: 5 },
  cardPrice: { fontSize: 16, color: '#6200ea', fontWeight: 'bold', marginTop: 5 },
  button: { backgroundColor: '#6200ea', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});