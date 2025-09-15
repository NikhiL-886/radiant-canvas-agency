// Admin API Services
// Contains all admin-related API calls

import { apiRequest, API_ENDPOINTS, getAuthToken } from '@/config/api';

// User Management API calls
export const adminUsersAPI = {
  // Get all users
  getAllUsers: async () => {
    return await apiRequest(API_ENDPOINTS.admin.users);
  },

  // Delete a user
  deleteUser: async (userId: string) => {
    return await apiRequest(API_ENDPOINTS.admin.deleteUser(userId), {
      method: 'DELETE',
    });
  },

  // Update user admin status
  updateUserAdminStatus: async (userId: string, isAdmin: boolean) => {
    return await apiRequest(API_ENDPOINTS.admin.updateUserAdmin(userId), {
      method: 'PATCH',
      body: JSON.stringify({ Admin: isAdmin }),
    });
  },
};

// Contact Management API calls
export const adminContactsAPI = {
  // Get all contacts
  getAllContacts: async () => {
    return await apiRequest(API_ENDPOINTS.admin.contacts);
  },

  // Delete a contact
  deleteContact: async (contactId: string) => {
    return await apiRequest(API_ENDPOINTS.admin.deleteContact(contactId), {
      method: 'DELETE',
    });
  },

  // Update contact status
  updateContactStatus: async (contactId: string, status: 'contacted' | 'uncontacted') => {
    return await apiRequest(API_ENDPOINTS.admin.updateContactStatus(contactId), {
      method: 'PATCH',
      body: JSON.stringify({ 
        status,
        contactedAt: status === 'contacted' ? new Date().toISOString() : null,
        contactedBy: status === 'contacted' ? localStorage.getItem('adminEmail') : null
      }),
    });
  },
};

// Dashboard Statistics API calls
export const adminStatsAPI = {
  // Get dashboard statistics
  getStats: async () => {
    return await apiRequest(API_ENDPOINTS.admin.stats);
  },
};

// Types for Admin API responses
export interface AdminUser {
  _id: string;
  username: string;
  email: string;
  Admin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminContact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  projectDescription?: string;
  status?: 'contacted' | 'uncontacted';
  contactedAt?: string;
  contactedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  totalUsers: number;
  totalContacts: number;
  totalAdmins: number;
  recentContacts: number;
  recentUsers: number;
}

export interface AdminUsersResponse {
  success: boolean;
  count: number;
  data: AdminUser[];
}

export interface AdminContactsResponse {
  success: boolean;
  count: number;
  data: AdminContact[];
}

export interface AdminStatsResponse {
  success: boolean;
  data: AdminStats;
}