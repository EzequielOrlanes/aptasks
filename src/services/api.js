// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Mude para sua URL em produção

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