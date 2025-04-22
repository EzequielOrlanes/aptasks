// src/services/api.js
import axios from 'axios';

// const API_URL = process.env.NODE_ENV === 'development' 
//   ? 'http://localhost:3000' // URL de desenvolvimento
//   : 'aptasks-production.up.railway.app'; // URL de prod


const API_URL = 'aptasks-production.up.railway.app'; // URL de desenvolvimento
export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};