import axios from 'axios';

const AUTH_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

const authApi = axios.create({
  baseURL: AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    console.log(`Attempting login for: ${email}`);
    
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      console.log('Using mock data for login');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        user: {
          id: '1',
          email: email,
          name: email.split('@')[0]
        }
      };
    }

    try {
      const response = await authApi.post('/login', { email, password });
      console.log('Login successful', response.data);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  async register(email: string, password: string, name?: string): Promise<AuthResponse> {
    console.log(`Attempting register for: ${email}`);

    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      console.log('Using mock data for register');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        user: {
          id: Math.random().toString(36).substring(7),
          email: email,
          name: name || email.split('@')[0]
        }
      };
    }

    try {
      const response = await authApi.post('/register', { email, password, name });
      console.log('Register successful', response.data);
      return response.data;
    } catch (error) {
      console.error('Register failed:', error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    // For simple JWT, we just clear local storage on the client side
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }

    try {
      const response = await authApi.get('/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.user;
    } catch (error) {
      console.error('Failed to get current user', error);
      return null;
    }
  },

  saveAuthData(data: AuthResponse) {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
  },

  getStoredUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }
};
