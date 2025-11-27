import api from './api';

interface RegisterData {
  name: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
  bio?: string;
  avatar?: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  async register(userData: RegisterData) {
    const response = await api.post('/register', userData);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  async login({ email, password }: LoginData) {
    const response = await api.post('/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  async logout() {
    await api.post('/logout');
    localStorage.removeItem('auth_token');
  },

  async getCurrentUser() {
    const response = await api.get('/me');
    return response.data.user;
  },

  async updateProfile(userData: Partial<RegisterData>) {
    const response = await api.put('/profile', userData);
    return response.data.user;
  },

  getToken() {
    return localStorage.getItem('auth_token');
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};
