import axios from "axios";
import { Bus, Conductores, Rutas, Viajes } from "./interfacesViajes";

const api = axios.create({
  baseURL: "http://localhost:8080", // Nota el /api añadido
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Interceptor para logging
api.interceptors.request.use(config => {
  console.log(`Request to: ${config.url}`);
  return config;
}, error => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

// Funciones API
export const fetchBuses = async (): Promise<Bus[]> => {
  const response = await api.get<Bus[]>("/bus");
  return response.data;
};

export const fetchConductores = async (): Promise<Conductores[]> => {
  const response = await api.get<Conductores[]>("/conductores");
  return response.data;
};

export const fetchRutas = async (): Promise<Rutas[]> => {
  const response = await api.get<Rutas[]>("/rutas");
  return response.data;
};

export const fetchViajes = async (): Promise<Viajes[]> => {
  const response = await api.get<Viajes[]>("/viajes");
  return response.data;
};

export default api;


/*

import axios from "axios";
import { Bus, Conductores, Rutas, Viajes } from "./interfacesViajes";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  timeout: 10000,
});

// Add CORS credentials if needed
api.defaults.withCredentials = true;

// Request interceptor
api.interceptors.request.use(config => {
  console.log('Request:', config.method?.toUpperCase(), config.url);
  return config;
}, error => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(response => {
  console.log('Response:', response.status, response.config.url);
  return response;
}, error => {
  console.error('Response Error:', error);
  if (error.response) {
    console.error('Error Data:', error.response.data);
    console.error('Error Status:', error.response.status);
  }
  return Promise.reject(error);
});

// Fetch functions with error handling
export const fetchBuses = async (): Promise<Bus[]> => {
  try {
    const response = await api.get<Bus[]>("/bus");
    return response.data;
  } catch (error) {
    console.error("Error fetching buses:", error);
    throw error;
  }
};

export const fetchConductores = async (): Promise<Conductores[]> => {
  try {
    const response = await api.get<Conductores[]>("/conductores");
    return response.data;
  } catch (error) {
    console.error("Error fetching conductores:", error);
    throw error;
  }
};

export const fetchRutas = async (): Promise<Rutas[]> => {
  try {
    const response = await api.get<Rutas[]>("/rutas");
    return response.data;
  } catch (error) {
    console.error("Error fetching rutas:", error);
    throw error;
  }
};

export const fetchViajes = async (): Promise<Viajes[]> => {
  try {
    const response = await api.get<Viajes[]>("/viajes");
    return response.data;
  } catch (error) {
    console.error("Error fetching viajes:", error);
    throw error;
  }
};

export default api;
*/