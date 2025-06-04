import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.109:5000/api', // Replace with actual backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optionally attach token from async storage
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default api;
