// src/services/refreshToken.js
import { getAuth } from 'firebase/auth';

export const refreshToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken(true); // força atualização
    localStorage.setItem("token", token);
  }
};
