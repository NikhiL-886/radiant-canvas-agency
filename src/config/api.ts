// API Configuration
// Centralized place to manage backend URLs and API endpoints

// Base URL for the backend API
// Update this URL to switch between development and production
export const API_BASE_URL = 'https://backend-production-93e9.up.railway.app/api';

// Alternative URLs for different environments
export const API_URLS = {
  development: 'http://localhost:3000/api',
  production: 'https://backend-production-93e9.up.railway.app/api',
  staging: 'https://backend-staging.up.railway.app/api', // if you have staging
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication endpoints
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    googleAuth: '/auth/google',
    forgotPassword: '/auth/forget-password',
    resetPassword: '/auth/reset-password',
    profile: '/auth/profile',
  },
  
  // Contact form endpoints
  contact: {
    submit: '/contact',
  },
  
  // Admin endpoints
  admin: {
    users: '/admin/users',
    contacts: '/admin/contacts',
    stats: '/admin/stats',
    deleteUser: (id: string) => `/admin/users/${id}`,
    deleteContact: (id: string) => `/admin/contacts/${id}`,
    updateUserAdmin: (id: string) => `/admin/users/${id}/admin`,
    updateContactStatus: (id: string) => `/admin/contacts/${id}/status`,
  },
};

// Helper function to get full URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

// Helper function to create fetch options with auth
export const createAuthHeaders = (token?: string): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Helper function to get token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// API Response Types
export interface ApiResponse<T = any> {
  success?: boolean;
  message: string;
  data?: T;
  token?: string;
  user?: any;
  error?: string;
  count?: number;
}

// Standard API request helper
export const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const url = getApiUrl(endpoint);
  const token = getAuthToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...createAuthHeaders(token),
      ...options.headers,
    },
  };
  
  try {
    console.log('Making API request to:', url); // Debug log
    const response = await fetch(url, config);
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      throw new Error(`Expected JSON but received: ${contentType}. Response: ${text.substring(0, 200)}`);
    }
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};