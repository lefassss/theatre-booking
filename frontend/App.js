import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import TheatresScreen from './screens/TheatresScreen';
import ShowsScreen from './screens/ShowsScreen';
import ShowtimesScreen from './screens/ShowtimesScreen';
import ReservationsScreen from './screens/ReservationsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Εγγραφή' }} />
        <Stack.Screen name="Theatres" component={TheatresScreen} options={{ title: 'Θέατρα', headerLeft: null }} />
        <Stack.Screen name="Shows" component={ShowsScreen} options={{ title: 'Παραστάσεις' }} />
        <Stack.Screen name="Showtimes" component={ShowtimesScreen} options={{ title: 'Ωράρια' }} />
        <Stack.Screen name="Reservations" component={ReservationsScreen} options={{ title: 'Κρατήσεις' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}