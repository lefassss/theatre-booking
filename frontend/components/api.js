import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.104:3000';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) config.headers['authorization'] = token;
  return config;
});

export const register = (name, email, password) =>
  api.post('/auth/register', { name, email, password });

export const login = (email, password) =>
  api.post('/auth/login', { email, password });

export const getTheatres = () => api.get('/theatres');

export const getShows = (theatreId) =>
  api.get(`/shows?theatreId=${theatreId}`);

export const getShowtimes = (showId) =>
  api.get(`/showtimes?showId=${showId}`);

export const getUserReservations = () => api.get('/reservations/user');

export const createReservation = (showtime_id, seats) =>
  api.post('/reservations', { showtime_id, seats });

export const cancelReservation = (id) => api.delete(`/reservations/${id}`);

export default api;