import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { getUserReservations, cancelReservation } from '../components/api';

export default function ReservationsScreen({ navigation }) {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = () => {
    getUserReservations()
      .then(res => setReservations(res.data.filter(r => r.status === 'active')))
      .catch(() => alert('Δεν ήταν δυνατή η φόρτωση κρατήσεων'));
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm('Θέλεις σίγουρα να ακυρώσεις την κράτηση;')) {
      try {
        await cancelReservation(id);
        alert('Η κράτηση ακυρώθηκε!');
        fetchReservations();
      } catch (err) {
        alert('Δεν ήταν δυνατή η ακύρωση');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎟 Οι Κρατήσεις μου</Text>
      {reservations.length === 0 ? (
        <Text style={styles.empty}>Δεν έχεις ενεργές κρατήσεις!</Text>
      ) : (
        reservations.map((item) => (
          <View key={item.reservation_id.toString()} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>🏛 {item.theatre_name}</Text>
            <Text style={styles.cardSubtitle}>📅 {item.show_date} | 🕐 {item.show_time}</Text>
            <Text style={styles.cardSubtitle}>💺 Θέσεις: {item.seats}</Text>
            <Text style={styles.status}>✅ Ενεργή</Text>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleCancel(item.reservation_id)}
            >
              <Text style={styles.cancelText}>Ακύρωση</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Theatres')}>
        <Text style={styles.backText}>← Πίσω στα Θέατρα</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  empty: { textAlign: 'center', color: '#999', fontSize: 16, marginTop: 50 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#6200ea' },
  cardSubtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  status: { fontSize: 14, fontWeight: 'bold', color: 'green', marginTop: 8 },
  cancelButton: { backgroundColor: '#ff5252', padding: 10, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  cancelText: { color: '#fff', fontWeight: 'bold' },
  backButton: { backgroundColor: '#6200ea', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10, marginBottom: 30 },
  backText: { color: '#fff', fontWeight: 'bold' },
});