import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getTheatres } from '../components/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TheatresScreen({ navigation }) {
  const [theatres, setTheatres] = useState([]);

  useEffect(() => {
    getTheatres()
      .then(res => setTheatres(res.data))
      .catch(() => Alert.alert('Σφάλμα', 'Δεν ήταν δυνατή η φόρτωση θεάτρων'));
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎭 Θέατρα</Text>
      <FlatList
        data={theatres}
        keyExtractor={(item) => item.theatre_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Shows', { theatreId: item.theatre_id, theatreName: item.name })}
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>📍 {item.location}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Αποσύνδεση</Text>
      </TouchableOpacity>
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
  logoutButton: { backgroundColor: '#ff5252', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  logoutText: { color: '#fff', fontWeight: 'bold' },
});