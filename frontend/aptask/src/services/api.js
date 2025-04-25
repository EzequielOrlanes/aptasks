// src/services/api.js
import api from './axiosInstance';


const API_URL = 'https://aptasks-production.up.railway.app'; 

export const registerUser = async (email, password) => {
  try {
    const response = await api.post(`${API_URL}/register`, {
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
    const response = await api.post(`${API_URL}/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const logoutUser = async () => {
  const token = localStorage.getItem('token');
  try {
    await api.post(`${API_URL}/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.removeItem("token"); // ou onde estiver armazenado o token
  } catch (error) {
    throw error.response.data.error;
  }
};

export const AvisosSaveToDB = async (avisoData) => {
  try {
    const response = await api.post(
      `${API_URL}/avisos`,
       avisoData, 
      {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }

};