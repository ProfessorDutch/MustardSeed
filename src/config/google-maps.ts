import { Libraries } from '@react-google-maps/api';

export const GOOGLE_MAPS_CONFIG = {
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  libraries: ['places'] as Libraries,
  region: 'US',
  language: 'en'
};