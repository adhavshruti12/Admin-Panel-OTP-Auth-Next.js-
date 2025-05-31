// Constants
export const ADMIN_CONTACT = '7710957578';
export const DEFAULT_OTP = '7710';
export const TOKEN_KEY = 'admin_token';

// Authentication functions
export const sendOtp = async (contactNumber) => {
  try {
    const response = await fetch('https://eazrdaily.eazr.in/auth/admin/sendOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contactNumber }),
    });

    if (!response.ok) {
      throw new Error('Failed to send OTP');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return { success: false, message: 'Failed to send OTP' };
  }
};

export const verifyOtp = async (contactNumber, otp) => {
  // For the assignment, we're using a mock verification
  if (contactNumber === ADMIN_CONTACT && otp === DEFAULT_OTP) {
    const mockToken = 'mock_admin_token_' + Math.random().toString(36).substring(2, 15);
    setToken(mockToken);
    return { success: true, token: mockToken };
  }
  
  return { success: false, message: 'Invalid OTP' };
};

// Token management
export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const isAuthenticated = () => {
  return !!getToken();
};

// Mock user data
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', contactNumber: '1234567890', role: 'Customer', status: 'Active', createdAt: '2023-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', contactNumber: '9876543210', role: 'Customer', status: 'Inactive', createdAt: '2023-02-20' },
  { id: '3', name: 'Robert Johnson', email: 'robert@example.com', contactNumber: '5555555555', role: 'Vendor', status: 'Active', createdAt: '2023-03-10' },
  { id: '4', name: 'Emily Davis', email: 'emily@example.com', contactNumber: '7777777777', role: 'Customer', status: 'Active', createdAt: '2023-04-05' },
  { id: '5', name: 'Michael Wilson', email: 'michael@example.com', contactNumber: '8888888888', role: 'Vendor', status: 'Active', createdAt: '2023-05-12' },
];

// API calls with authentication
export const fetchUsers = async () => {
  const token = getToken();
  if (!token) {
    throw new Error('No authentication token found');
  }
  return mockUsers;
};

export const fetchUserById = async (id) => {
  const token = getToken();
  if (!token) {
    throw new Error('No authentication token found');
  }
  return mockUsers.find(user => user.id === id) || null;
};