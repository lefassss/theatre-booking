import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { getTheatres } from '../components/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TheatresScreen({ navigation }) {
  const [theatres, setTheatres] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getTheatres()
      .then(res => setTheatres(res.data))
      .catch(() => alert('Δεν ήταν δυνατή η φόρτωση θεάτρων'));
  }, []);

  const filtered = theatres.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎭 Θέατρα</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Αναζήτηση θεάτρου ή τοποθεσίας..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
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
        ListEmptyComponent={<Text style={styles.empty}>Δεν βρέθηκαν θέατρα</Text>}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Αποσύνδεση</Text>
      </TouchableOpacity>
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
  logoutButton: { backgroundColor: '#ff5252', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  logoutText: { color: '#fff', fontWeight: 'bold' },
});